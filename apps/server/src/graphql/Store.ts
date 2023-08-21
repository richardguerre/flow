import { GraphQLError } from "graphql";
import {
  getPluginJson,
  getPluginsInStore,
  installServerPlugin,
  uninstallServerPlugin,
} from "../utils/getPlugins";
import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { genSalt, hash, compare } from "bcryptjs";
import crypto from "crypto";
import { dayjs } from "../utils/dayjs";

/** The pluginSlug used to set Flow specific items in the Store table. */
export const FlowPluginSlug = "flow";
export const StoreKeys = {
  INSTALLED_PLUGINS: "installed-plugins",
  PASSWORD_HASH: "password-hash",
  AUTH_SESSION_PREFIX: "session-",
};

type AuthSession = {
  /** When the session was created. */
  createdAt: string;
  /** When the session expires. */
  expiresAt: string;
  /** The session's token. */
  token: string;
} & (
  | {
      /** The name of the session. */
      name: string;
    }
  | {
      /** user-agent header that created the session. */
      userAgent: string;
    }
);

export type PluginInstallation = {
  /** The plugin's slug */
  slug: string;
  /** The plugin's URL. It can be jsdelivr URL or anything that servers application/javascript static files. */
  url: string;
};

export const StoreType = builder.prismaNode("Store", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    key: t.exposeString("key"),
    value: t.expose("value", { type: "JSON" }),
    pluginSlug: t.exposeString("pluginSlug"),
  }),
});

// --------------- Setting query types ---------------

builder.queryField("storeItems", (t) =>
  // TODO: maybe change to prismaConnection and add pagination. See https://github.com/devoxa/prisma-relay-cursor-connection/blob/936a800b8ec4cf62b644bce4c0c0fdf7a90f5e7c/src/index.ts#L12 or https://gist.github.com/ctrlplusb/17b5a1bd1736b5ba547bb15b3dd5be29#file-findmanycursor-ts
  t.prismaFieldWithInput({
    type: ["Store"],
    description: `Get store items.

Pass the \`pluginSlug\` if you want to get items created by a specific plugin. Not passing the \`pluginSlug\` will return items created by flow.`,
    input: {
      pluginSlug: t.input.string({ required: false }),
      keys: t.input.stringList({ required: false }),
    },
    argOptions: {
      required: false,
    },
    resolve: (query, _, args) => {
      return prisma.store.findMany({
        ...query,
        where: {
          isSecret: false,
          isServerOnly: false,
          ...(args.input?.pluginSlug ? { pluginSlug: args.input?.pluginSlug } : {}),
          ...(args.input?.keys?.length ? { key: { in: args.input.keys } } : {}),
        },
      });
    },
  })
);

builder.queryField("isPasswordSet", (t) =>
  t.field({
    type: "Boolean",
    description: "Check if the password is set.",
    resolve: async () => {
      const passwordSetting = await prisma.store
        .findUnique({
          where: {
            pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
          },
        })
        .catch(() => null);
      return !!passwordSetting;
    },
  })
);

builder.queryField("installedPlugins", (t) =>
  t.field({
    type: [PluginInstallationType],
    description: "Get all installed plugins.",
    resolve: getPluginsInStore,
  })
);

const PluginInstallationType = builder.objectType(
  builder.objectRef<PluginInstallation>("PluginInstallation"),
  {
    fields: (t) => ({
      slug: t.exposeString("slug"),
      url: t.exposeString("url"),
    }),
  }
);

// --------------- Setting mutation types ---------------

builder.mutationField("upsertStoreItem", (t) =>
  t.prismaFieldWithInput({
    type: "Store",
    description: `Creates a store item. If a store item with the same key exists, it will be updated.

If the \`pluginSlug\` is passed, it will create/update a store item for that plugin. Otherwise, it will create/update a store item for flow.

If \`isSecret\` is set to true, the store item will be set or updated with \`isServerOnly\` set to true as well and will not be returned in the \`storeItems\` query.

If \`isServerOnly\` is set to true, the store item will not be returned in the \`storeItems\` query.`,
    input: {
      key: t.input.string({ required: true }),
      value: t.input.field({ type: "JSON", required: true }),
      pluginSlug: t.input.string({ required: true }),
      isSecret: t.input.boolean({ required: false }),
      isServerOnly: t.input.boolean({ required: false }),
    },
    resolve: (query, _, args) => {
      return prisma.store.upsert({
        ...query,
        where: {
          pluginSlug_key_unique: { key: args.input.key, pluginSlug: args.input.pluginSlug },
        },
        update: { value: args.input.value },
        create: {
          key: args.input.key,
          value: args.input.value,
          pluginSlug: args.input.pluginSlug,
          isSecret: args.input.isSecret ?? false,
          isServerOnly: args.input.isServerOnly ?? args.input.isSecret ?? false,
        },
      });
    },
  })
);

builder.mutationField("installPlugin", (t) =>
  t.fieldWithInput({
    type: [PluginInstallationType],
    description:
      "Install a plugin. If a plugin with the same slug exists, it will throw an error, unless `override` is set to true.",
    input: {
      url: t.input.string({ required: true }),
      override: t.input.boolean({ required: false }),
    },
    resolve: async (_, args) => {
      let installedPlugins = await getPluginsInStore();

      // this will throw GraphQLErrors if there are problems with the plugin.json file
      const newPluginJson = await getPluginJson({ url: args.input.url });

      if (!args.input.override && installedPlugins.find((p) => p.slug === newPluginJson.slug)) {
        throw new GraphQLError(
          `PLUGIN_WITH_SAME_SLUG: A plugin with the slug "${newPluginJson.slug}" is already installed. Use the \`override\` option to override the existing plugin.`
        );
      }

      if (newPluginJson.server) {
        // this will throw GraphQLErrors if there are problems with the plugin installation process
        await installServerPlugin({
          url: args.input.url,
          slug: newPluginJson.slug,
          override: args.input.override ?? false,
        });
      }

      // remove old plugin installation if it exists
      installedPlugins = installedPlugins.filter((p) => p.slug !== newPluginJson.slug);
      // add new plugin installation
      installedPlugins.push({
        url: args.input.url,
        slug: newPluginJson.slug,
      });

      const newSetting = await prisma.store.upsert({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.INSTALLED_PLUGINS, pluginSlug: FlowPluginSlug },
        },
        update: { value: installedPlugins },
        create: {
          key: StoreKeys.INSTALLED_PLUGINS,
          pluginSlug: FlowPluginSlug,
          value: installedPlugins,
          isSecret: false,
          isServerOnly: false,
        },
      });
      return newSetting.value as PluginInstallation[];
    },
  })
);

builder.mutationField("uninstallPlugin", (t) =>
  t.fieldWithInput({
    type: [PluginInstallationType],
    description: "Uninstall a plugin.",
    input: {
      slug: t.input.string({ required: true }),
    },
    resolve: async (_, args) => {
      let installedPlugins = await getPluginsInStore();

      // uninstall the plugin on the server's file system
      await uninstallServerPlugin(args.input.slug);

      // remove old plugin installation if it exists
      installedPlugins = installedPlugins.filter((p) => p.slug !== args.input.slug);

      const newSetting = await prisma.store.upsert({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.INSTALLED_PLUGINS, pluginSlug: FlowPluginSlug },
        },
        update: { value: installedPlugins },
        create: {
          key: StoreKeys.INSTALLED_PLUGINS,
          pluginSlug: FlowPluginSlug,
          value: installedPlugins,
          isSecret: false,
          isServerOnly: false,
        },
      });
      return newSetting.value as PluginInstallation[];
    },
  })
);

const generatePasswordHash = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

const generateSessionToken = () => {
  return crypto.randomBytes(16).toString("base64url");
};

builder.mutationField("setPassword", (t) =>
  t.fieldWithInput({
    type: "String",
    description:
      "Set password for the Flow instance and get a session token to make authenticated requests.",
    input: {
      password: t.input.string({ required: true, description: "The password to set (unhashed)." }),
    },
    resolve: async (_, args, context) => {
      // check password length
      if (args.input.password.length < 8) {
        throw new GraphQLError("PASSWORD_TOO_SHORT: The password must be at least 8 characters.");
      }

      // check if password was already set
      const passwordSetting = await prisma.store.findUnique({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
        },
      });

      if (passwordSetting) {
        throw new GraphQLError(
          "PASSWORD_ALREADY_SET: The password can only be set once. Use the `changePassword` mutation to change the password."
        );
      }

      const passwordHash = await generatePasswordHash(args.input.password);

      await prisma.store
        .create({
          data: {
            key: StoreKeys.PASSWORD_HASH,
            pluginSlug: FlowPluginSlug,
            value: passwordHash,
            isSecret: true,
            isServerOnly: true,
          },
        })
        .catch((e) => {
          console.error(e);
          throw new GraphQLError("Something went wrong while setting the password.");
        });

      // generate session token
      const sessionToken = generateSessionToken();

      const authSession: AuthSession = {
        ...(context.userAgent ? { userAgent: context.userAgent } : { name: "No user-agent" }),
        createdAt: dayjs().toISOString(),
        expiresAt: dayjs().add(1, "year").toISOString(),
        token: sessionToken,
      };
      const authSessionKey = StoreKeys.AUTH_SESSION_PREFIX + "primary";

      // store session token
      await prisma.store.upsert({
        where: { pluginSlug_key_unique: { key: authSessionKey, pluginSlug: FlowPluginSlug } },
        update: { value: authSession },
        create: {
          key: authSessionKey,
          pluginSlug: FlowPluginSlug,
          value: authSession,
          isSecret: true,
          isServerOnly: true,
        },
      });

      return sessionToken;
    },
  })
);

builder.mutationField("changePassword", (t) =>
  t.fieldWithInput({
    type: "String",
    description:
      "Change password for the Flow instance and get a new session token to make authenticated requests.",
    input: {
      oldPassword: t.input.string({ required: true, description: "The old password (unhashed)." }),
      newPassword: t.input.string({ required: true, description: "The new password (unhashed)." }),
    },
    resolve: async (_, args, context) => {
      // check newPassword length
      if (args.input.newPassword.length < 8) {
        throw new GraphQLError(
          "PASSWORD_TOO_SHORT: The new password must be at least 8 characters."
        );
      }

      // check if password was already set
      const passwordSetting = await prisma.store.findUnique({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
        },
      });

      if (!passwordSetting) {
        throw new GraphQLError(
          "PASSWORD_NOT_SET: The password is not set. Use the `setPassword` mutation to set the password."
        );
      }

      const newPasswordHash = await generatePasswordHash(args.input.newPassword);
      const isOldPasswordCorrect = await compare(
        args.input.oldPassword,
        passwordSetting.value as string
      );

      if (!isOldPasswordCorrect) {
        throw new GraphQLError("PASSWORD_INCORRECT: The old password is incorrect.");
      }

      await prisma.store
        .update({
          where: {
            pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
          },
          data: { value: newPasswordHash },
        })
        .catch((e) => {
          console.error(e);
          throw new GraphQLError("Something went wrong while changing the password.");
        });

      // generate new session token
      const sessionToken = generateSessionToken();

      const authSession: AuthSession = {
        ...(context.userAgent ? { userAgent: context.userAgent } : { name: "No user-agent" }),
        createdAt: dayjs().toISOString(),
        expiresAt: dayjs().add(1, "year").toISOString(),
        token: sessionToken,
      };
      const authSessionKey = StoreKeys.AUTH_SESSION_PREFIX + "primary";

      // store session token
      await prisma.store.upsert({
        where: { pluginSlug_key_unique: { key: authSessionKey, pluginSlug: FlowPluginSlug } },
        update: { value: authSession },
        create: {
          key: authSessionKey,
          pluginSlug: FlowPluginSlug,
          value: authSession,
          isSecret: true,
          isServerOnly: true,
        },
      });

      return sessionToken;
    },
  })
);

builder.mutationField("login", (t) =>
  t.fieldWithInput({
    type: "String",
    description:
      "Login to the Flow instance and get a session token to make authenticated requests.",
    input: {
      password: t.input.string({ required: true, description: "The password (unhashed)." }),
    },
    resolve: async (_, args, context) => {
      // check if password was already set
      const passwordSetting = await prisma.store.findUnique({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
        },
      });

      if (!passwordSetting) {
        throw new GraphQLError(
          "PASSWORD_NOT_SET: The password is not set. Use the `setPassword` mutation to set the password."
        );
      }

      const isPasswordCorrect = await compare(args.input.password, passwordSetting.value as string);

      if (!isPasswordCorrect) {
        throw new GraphQLError("PASSWORD_INCORRECT: The password is incorrect.");
      }

      // generate session token
      const sessionToken = generateSessionToken();

      const authSession: AuthSession = {
        ...(context.userAgent ? { userAgent: context.userAgent } : { name: "No user-agent" }),
        createdAt: dayjs().toISOString(),
        expiresAt: dayjs().add(1, "year").toISOString(),
        token: sessionToken,
      };
      const authSessionKey = StoreKeys.AUTH_SESSION_PREFIX + "primary";

      // store session token
      await prisma.store.upsert({
        where: { pluginSlug_key_unique: { key: authSessionKey, pluginSlug: FlowPluginSlug } },
        update: { value: authSession },
        create: {
          key: authSessionKey,
          pluginSlug: FlowPluginSlug,
          value: authSession,
          isSecret: true,
          isServerOnly: true,
        },
      });

      return sessionToken;
    },
  })
);

builder.mutationField("logout", (t) =>
  t.field({
    type: "Boolean",
    description:
      "Logout from the Flow instance using the session token set in the Authorization header.",
    resolve: async (_, __, { sessionToken }) => {
      await prisma.store.deleteMany({
        where: {
          pluginSlug: FlowPluginSlug,
          key: { startsWith: StoreKeys.AUTH_SESSION_PREFIX },
          value: { path: ["token"], equals: sessionToken },
        },
      });
      return true;
    },
  })
);
