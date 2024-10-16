import { GraphQLError } from "graphql";
import { getPlugins } from "../utils/getPlugins";
import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { dayjs } from "../utils/dayjs";
import { scheduleRolloverTasks } from "../utils";

/** The pluginSlug used to set Flow specific items in the Store table. */
export const FlowPluginSlug = "flow";
export const StoreKeys = {
  INSTALLED_PLUGINS: "installed-plugins",
  PASSWORD_HASH: "password-hash",
  AUTH_SESSION_PREFIX: "session-",
  TIMEZONE: "timezone",
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

export const StoreType = builder.prismaNode("Store", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    key: t.exposeString("key"),
    pluginSlug: t.exposeString("pluginSlug"),
    isSecret: t.exposeBoolean("isSecret"),
    isServerOnly: t.exposeBoolean("isServerOnly"),
    value: t.field({
      type: "JSON",
      nullable: true,
      description: "The value of the store item.",
      resolve: (store) => (store.isSecret || store.isServerOnly ? null : store.value),
    }),
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
      name: "where",
    },
    resolve: (query, _, args) => {
      return prisma.store.findMany({
        ...query,
        where: {
          ...(args.where?.pluginSlug ? { pluginSlug: args.where?.pluginSlug } : {}),
          ...(args.where?.keys?.length ? { key: { in: args.where.keys } } : {}),
        },
      });
    },
  }),
);

builder.queryField("isPasswordSet", (t) =>
  t.field({
    authScopes: { public: true },
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
    type: "Boolean",
    description: "Whether the password is set.",
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
  }),
);

builder.queryField("timezoneSet", (t) =>
  t.field({
    type: "String",
    description: "The timezone set for the Flow instance. `null` if no timezone is set.",
    nullable: true,
    authScopes: { public: true },
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
    resolve: async () => {
      const timezoneSetting = await prisma.store
        .findUnique({
          where: { pluginSlug_key_unique: { key: StoreKeys.TIMEZONE, pluginSlug: FlowPluginSlug } },
        })
        .catch(() => null);
      return (timezoneSetting?.value ?? null) as string | null;
    },
  }),
);

builder.queryField("isFullySetup", (t) =>
  t.field({
    type: "Boolean",
    description: "Whether the Flow instance is fully setup.",
    nullable: false,
    authScopes: { public: true },
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
    resolve: async () => {
      const storeItems = await prisma.store.findMany({
        where: {
          key: { in: [StoreKeys.PASSWORD_HASH, StoreKeys.TIMEZONE] },
          pluginSlug: FlowPluginSlug,
        },
      });
      return storeItems.length === 2;
    },
  }),
);

builder.queryField("isSessionValid", (t) =>
  t.field({
    type: "Boolean",
    description: "Whether the session is valid.",
    authScopes: { public: true },
    skipTypeScopes: true,
    resolve: (_, __, context) => context.isSessionValid(),
  }),
);

// --------------- Setting mutation types ---------------

builder.mutationField("upsertStoreItem", (t) =>
  t.prismaFieldWithInput({
    type: "Store",
    description: `Creates a store item. If a store item with the same key exists, only its value will be updated (\`isSecret\` and \`isServerOnly\` will not be updated).

If the \`pluginSlug\` is passed, it will create/update a store item for that plugin. Otherwise, it will create/update a store item for flow.

If \`isSecret\` is set to true, \`isServerOnly\` will also be set to true and will not be returned in the \`storeItems\` query (it will be \`null\`). The item will only be accessible by plugin with the same \`pluginSlug\` in the server.

If \`isServerOnly\` is set to true, the store item will not be returned in the \`storeItems\` query (it will be \`null\`). The item will be accessible by all plugins in the server.`,
    input: {
      key: t.input.string({ required: true }),
      value: t.input.field({ type: "JSON", required: true }),
      pluginSlug: t.input.string({ required: true }),
      isSecret: t.input.boolean({ required: false }),
      isServerOnly: t.input.boolean({ required: false }),
    },
    resolve: async (query, _, args) => {
      if (args.input.pluginSlug === "flow") {
        throw new GraphQLError(
          "The slug 'flow' is reserved for internal use. Please use your plugin's slug.",
          {
            extensions: {
              code: "KEY_RESERVED",
              userFriendlyMessage:
                "The item couldn't be saved. Please ask the plugin author for more information.",
            },
          },
        );
      }
      const res = await prisma.store.upsert({
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
      const plugins = await getPlugins();
      const plugin = plugins[args.input.pluginSlug];
      await plugin
        ?.onStoreItemUpsert?.(args.input.key)
        .catch((e) =>
          console.log(`Error plugin.onStoreItemUpsert for ${args.input.pluginSlug}`, e),
        ); // TODO: maybe execute in message queue instead of synchronously
      return res;
    },
  }),
);

const generatePasswordHash = async (password: string) => {
  return Bun.password.hash(password, "bcrypt");
};

const generateSessionToken = () => {
  return new Bun.CryptoHasher("sha256").update(Math.random().toString()).digest("base64");
};

builder.mutationField("setPassword", (t) =>
  t.fieldWithInput({
    authScopes: { public: true },
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
    type: "String",
    description:
      "Set password for the Flow instance and get a session token to make authenticated requests.",
    input: {
      password: t.input.string({ required: true, description: "The password to set (unhashed)." }),
    },
    resolve: async (_, args, context) => {
      // check password length
      if (args.input.password.length < 8) {
        throw new GraphQLError("The password must be at least 8 characters long.", {
          extensions: { code: "PASSWORD_TOO_SHORT" },
        });
      }

      // check if password was already set
      const passwordSetting = await prisma.store.findUnique({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
        },
      });

      if (passwordSetting) {
        throw new GraphQLError(
          "The password can only be set once. Use the `changePassword` mutation to change the password.",
          { extensions: { code: "PASSWORD_ALREADY_SET" } },
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
        .catch((e: any) => {
          console.error(e);
          throw new GraphQLError(e.message ?? "Something went wrong while setting the password.", {
            extensions: {
              code: "PASSWORD_SET_ERROR",
              userFriendlyMessage: "Something went wrong while setting the password.",
            },
          });
        });

      // generate session token
      const sessionToken = generateSessionToken();

      const authSession: AuthSession = {
        ...(context.userAgent ? { userAgent: context.userAgent } : { name: "No user-agent" }),
        createdAt: dayjs().toISOString(),
        expiresAt: dayjs().add(1, "year").toISOString(),
        token: sessionToken,
      };
      const authSessionKey = StoreKeys.AUTH_SESSION_PREFIX + dayjs().toISOString();

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
  }),
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
        throw new GraphQLError("The new password must be at least 8 characters.", {
          extensions: { code: "PASSWORD_TOO_SHORT" },
        });
      }

      // check if password was already set
      const passwordSetting = await prisma.store.findUnique({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
        },
      });

      if (!passwordSetting) {
        throw new GraphQLError(
          "The password is not set. Use the `setPassword` mutation to set the password.",
          {
            extensions: {
              code: "PASSWORD_NOT_SET",
              userFriendlyMessage:
                "No password was set for your Flow yet. Please refresh the page to set the password.",
            },
          },
        );
      }

      const isOldPasswordCorrect = await Bun.password.verify(
        args.input.oldPassword,
        passwordSetting.value as string,
      );

      if (!isOldPasswordCorrect) {
        throw new GraphQLError("The old password is incorrect.", {
          extensions: { code: "PASSWORD_INCORRECT" },
        });
      }

      const newPasswordHash = await generatePasswordHash(args.input.newPassword);
      await prisma.store
        .update({
          where: {
            pluginSlug_key_unique: { key: StoreKeys.PASSWORD_HASH, pluginSlug: FlowPluginSlug },
          },
          data: { value: newPasswordHash },
        })
        .catch((e: any) => {
          console.error(e);
          throw new GraphQLError(e.message ?? "Something went wrong while changing the password.", {
            extensions: {
              code: "PASSWORD_CHANGE_ERROR",
              userFriendlyMessage: "Something went wrong while changing the password.",
            },
          });
        });

      // generate new session token
      const sessionToken = generateSessionToken();

      const authSession: AuthSession = {
        ...(context.userAgent ? { userAgent: context.userAgent } : { name: "No user-agent" }),
        createdAt: dayjs().toISOString(),
        expiresAt: dayjs().add(1, "year").toISOString(),
        token: sessionToken,
      };
      const authSessionKey = StoreKeys.AUTH_SESSION_PREFIX + dayjs().toISOString();

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

      // delete all other sessions
      await prisma.store.deleteMany({
        where: { pluginSlug: FlowPluginSlug, key: { not: authSessionKey } },
      });

      return sessionToken;
    },
  }),
);

builder.mutationField("login", (t) =>
  t.fieldWithInput({
    authScopes: { public: true },
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
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
          "The password is not set. Use the `setPassword` mutation to set the password.",
          {
            extensions: {
              code: "PASSWORD_NOT_SET",
              userFriendlyMessage:
                "No password was set for your Flow yet. Please refresh the page to set the password.",
            },
          },
        );
      }

      const isPasswordCorrect = await Bun.password.verify(
        args.input.password,
        passwordSetting.value as string,
      );

      if (!isPasswordCorrect) {
        throw new GraphQLError("The password is incorrect.", {
          extensions: { code: "PASSWORD_INCORRECT" },
        });
      }

      // generate session token
      const sessionToken = generateSessionToken();

      const authSession: AuthSession = {
        ...(context.userAgent ? { userAgent: context.userAgent } : { name: "No user-agent" }),
        createdAt: dayjs().toISOString(),
        expiresAt: dayjs().add(1, "year").toISOString(),
        token: sessionToken,
      };
      const authSessionKey = StoreKeys.AUTH_SESSION_PREFIX + dayjs().toISOString();

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
  }),
);

builder.mutationField("logout", (t) =>
  t.field({
    authScopes: { authenticated: true }, // this ensures that the sessionToken is set and is valid before even deleting the session token
    skipTypeScopes: true, // this is required as the authScope of the Query type is set to authenticated by default
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
  }),
);

builder.mutationField("setTimezone", (t) =>
  t.fieldWithInput({
    type: "String",
    description:
      'Set the timezone using a [dayjs timezone string](https://day.js.org/docs/en/plugin/timezone) (e.g. "America/New_York") for the Flow instance. This will affect the time the tasks are synced (default is 04:00 in the timezone set)',
    input: {
      timezone: t.input.string({
        required: true,
        description:
          'The timezone to set as a [dayjs timezone string](https://day.js.org/docs/en/plugin/timezone) (e.g. "America/New_York").',
      }),
    },
    resolve: async (_, args) => {
      try {
        dayjs().tz(args.input.timezone); // check if timezone is valid
      } catch {
        throw new GraphQLError(
          'The timezone is invalid. Please use a correct timezone identifier (e.g. "America/New_York") from this list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.',
          { extensions: { code: "TIMEZONE_INVALID" } },
        );
      }
      await prisma.store.upsert({
        where: {
          pluginSlug_key_unique: { key: StoreKeys.TIMEZONE, pluginSlug: FlowPluginSlug },
        },
        update: { value: args.input.timezone },
        create: {
          key: StoreKeys.TIMEZONE,
          pluginSlug: FlowPluginSlug,
          value: args.input.timezone,
          isSecret: false,
          isServerOnly: false,
        },
      });
      await scheduleRolloverTasks(args.input.timezone); // reschedule the rollover tasks to the new timezone
      return args.input.timezone;
    },
  }),
);
