/** An object where the key is the environment variable name and the value is an array where:
 * the first element is whether it's required or not.
 * the second whether it's sensitive and should be obfusucated in stdout.
 */
const envsToCheck = {
  NODE_ENV: [false, false],
  PORT: [false, false],
  DATABASE_URL: [true, true],
  ORIGIN: [true, false],
} as const;

/** Copy of process.env in memory so that process.env can be deleted and not used in plugins for unsafe things. */
const env: Record<string, string | undefined> = {};

// didn't use zod nor chalk/ink/colors for this as it's not worth installing for just this (it's 600+kb to install)
// color from https://backbencher.dev/nodejs-colored-text-console
console.log("\x1b[2mEnvironment variables:\x1b[0m");
for (const [envKey, [required, sensitive]] of Object.entries(envsToCheck)) {
  const envValue = process.env[envKey];
  if (required && !envValue) {
    throw `\x1b[31mEnvironment variable ${envKey} is required but not set.\x1b[0m`;
  }
  if (sensitive) {
    console.log(`\x1b[2m  ${envKey}: ${envValue ? `***${envValue.slice(-15)}` : undefined}\x1b[0m`);
  } else {
    console.log(`\x1b[2m  ${envKey}: ${envValue}\x1b[0m`);
  }
  env[envKey] = envValue;
  delete process.env[envKey]; // delete from process.env so that plugins can't use it
}

export { env };
