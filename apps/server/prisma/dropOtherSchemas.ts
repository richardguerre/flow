/**
 * 🚨 This script should only be run in development and not in production!
 *
 * This script was created to reset other schemas in the database (like pgboss used by the pg-boss library)
 * so that when re-applying migrations, the schema is not already created and the migration fails.
 *
 * The alternatives tried were:
 * - Adding previewFeatures = ["multiSchema"] to the schema in schema.prisma + adding schemas = ["public", "pgboss"]
 *   - This wasn't desirable as it meant making a lot of changes to the schema.prisma file and also adding @@schema to every and new models
 * - Letting it be and communicating to devs that they can either ignore the migration error or manually delete the schema and then re-run the migration
 *   - This wasn't desirable as it meant that every dev would have to do this manually and it would be a pain to do so
 *
 * Notes for executing this script:
 * - Using the prisma client instead of another postgres client because it's already configured and
 * wouldn't require installing another dependency.
 */
import { prisma } from "@flowdev/server/src/utils/prisma";

const schemas = ["pgboss"];

(async () => {
  console.log(`🚀 Dropping schemas: ${schemas.join(", ")}`);
  console.log(`Once dropped, they will be re-created when applying migrations.`);
  for (const schema of schemas) {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
    console.log(`✅ Dropped schema ${schema}`);
  }
})();
