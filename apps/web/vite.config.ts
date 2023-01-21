import { defineConfig, PluginOption } from "vite";
// // @ts-ignore as we are not typechecking the relay config file
// import relayConfig from "../../relay.config.json";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import WindiCSS from "vite-plugin-windicss";
import { parse } from "graphql";
import crypto from "crypto";

/**
 * This is a custom implementation of babel-plugin-relay and NextJS's swc relay compiler.
 * It was chosen over using the vite-babel-plugin + babel-plugin-relay (or babel-plugin-macros) as using babel meant parsing
 * and transforming the whole codebase twice (once by Vite, and once by Babel), which is not the case with this implementation.
 */
const relay = () =>
  ({
    name: "vite:relay",
    async transform(src, id) {
      let code = src;
      if (/.(t|j)sx?$/.test(id)) {
        if (src.includes("graphql`")) {
          const imports: Array<string> = [];

          code = code.replace(/graphql`([\s\S]*?)`/gm, (_, query) => {
            const queryDefinition = parse(query).definitions[0];
            // @ts-ignore as we know that every Relay GraphQL operation is a type that has a name
            const operationName = queryDefinition?.name?.value;
            if (!operationName) throw new Error(`Incorrect GraphQL operation in ${id}`);

            const graphqlFileName = `graphql__${crypto.randomBytes(10).toString("hex")}`;
            imports.push(
              `import ${graphqlFileName} from "@/relay/__generated__/${operationName}.graphql.ts";`
            );
            return graphqlFileName;
          });
          code = imports.join("\n") + code;
        }
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
    // @ts-ignore as WindiCSS types are not updated to those of Vite 4.0, but the plugin works fine
    WindiCSS(),
  ],
});
