import PgBoss from "pg-boss";
import { env } from "../env";

export const pgBoss = new PgBoss(env.DATABASE_URL ?? "postgresql://postgres@localhost:5432/flow");
pgBoss.on("error", (error) => {
  console.error(error);
});

export type PgBossType = typeof pgBoss;
