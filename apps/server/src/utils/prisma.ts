import { PrismaClient } from "@prisma/client";
import { env } from "../env";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});
