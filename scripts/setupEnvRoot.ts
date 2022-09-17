import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const cwd = process.cwd();
const pathToEnvBase = path.resolve(cwd, ".env.base");
dotenvExpand.expand(
  dotenv.config({
    path: pathToEnvBase,
  })
);

const matcher = /(\${?)(\w+)(}?)/g;

(async () => {
  const baseEnv = await fs.readFile(pathToEnvBase, { encoding: "utf-8" });
  const output = baseEnv.replace(matcher, (...args) => {
    const key = args[2];
    const value = process.env[key];
    if (!value) {
      console.error(`Env ${key} not defined`);
      return args[0];
    } else return value;
  });

  await fs.writeFile(path.resolve(cwd, ".env"), output);
})();
