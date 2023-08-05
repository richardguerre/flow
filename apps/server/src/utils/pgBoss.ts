import PgBoss from "pg-boss";

export const pgBoss = new PgBoss(
  process.env.DATABASE_URL ?? "postgresql://postgres@localhost:5432/flow"
);
pgBoss.on("error", (error) => {
  console.error(error);
});

export type PgBossType = typeof pgBoss;
