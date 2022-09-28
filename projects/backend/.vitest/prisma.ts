import { PrismaClient } from "@prisma/client";
import * as prismaUtils from "../src/utils/prisma";
import { execSync } from "child_process";
import { join } from "path";
import { URL } from "url";
import { nanoid } from "nanoid";
import { beforeEach, afterEach, vi } from "vitest";

// ------- mock implementation --------

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a database url");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append("schema", schema);
  return url.toString();
};

const schemaId = `test-${nanoid()}`;
const prismaBinary = join(__dirname, "..", "node_modules", ".bin", "prisma");

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
const prismaTestClient = new PrismaClient({
  datasources: { db: { url } },
});

// ------- setup and teardown --------

const prismaMock = vi.spyOn(prismaUtils, "prisma", "get");
export const withDb = () => {
  prismaMock.mockReturnValue(prismaTestClient);
};

beforeEach(() => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseURL(schemaId),
    },
  });
});
afterEach(async () => {
  await prismaTestClient.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  await prismaTestClient.$disconnect();
});
