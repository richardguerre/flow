import supertest from "supertest";
import { app } from "../src/index";

export const server = supertest(app);

type GraphQLRequest = {
  query: string;
  variables?: Record<string, unknown>;
};
export const graphql = (request: GraphQLRequest) => {
  return server.post("/graphql").send(request);
};

export const gql = (val: TemplateStringsArray) => val[0];
