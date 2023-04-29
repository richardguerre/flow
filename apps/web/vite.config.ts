import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { parse } from "graphql";
import crypto from "crypto";

/**
 * This is a custom implementation of babel-plugin-relay and NextJS's swc relay compiler.
 * It was chosen over using the recommended vite-babel-plugin + babel-plugin-relay (or babel-plugin-macros) as using babel meant parsing
 * and transforming the whole codebase twice (once by Vite, and once by Babel), which is not the case with this implementation.
 * The @vitejs/plugin-react-swc@3.1.0-beta.2 plugin was also considered, but it does not seem to work with @swc/plugin-relay.
 */
const relay = () =>
  ({
    name: "vite:relay",
    async transform(src, id) {
      let code = src;
      if (/.(t|j)sx?$/.test(id) && src.includes("graphql`")) {
        const imports: Array<string> = [];

        code = code.replace(/graphql`([\s\S]*?)`/gm, (_, query) => {
          const queryDefinition = parse(query).definitions[0];
          // @ts-ignore as we know that every Relay GraphQL operation is a type that has a name
          const operationName = queryDefinition?.name?.value;
          if (!operationName) throw new Error(`Incorrect GraphQL operation in ${id}`);

          const graphqlFileName = `graphql__${crypto.randomBytes(10).toString("hex")}`;
          imports.push(
            `import ${graphqlFileName} from "@flowdev/web/relay/__generated__/${operationName}.graphql.ts";`
          );
          return graphqlFileName;
        });
        code = imports.join("\n") + code;
      }

      return { code, map: null };
    },
  } as PluginOption);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // @ts-ignore as tsconfigPaths types are not updated to those of Vite 4.0, but the plugin works fine
    tsconfigPaths(),
    relay(),
  ],
});
