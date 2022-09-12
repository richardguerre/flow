import { createServer } from "@graphql-yoga/node";
import { schema } from "./graphql";

(async () => {
  const server = createServer({ schema });
  await server.start();
})();
