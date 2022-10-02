import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";
import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";
import packageJson from "../package.json";

dotenvExpand.expand(config());

const matcher = /(\${?)(\w+)(}?)/g;

(async () => {
  const baseEnv = await readFile(resolve(process.cwd(), ".env"), { encoding: "utf-8" });

  const outputString = baseEnv.replace(matcher, (...args) => {
    const key = args[2];
    const value = process.env[key];
    if (!value) {
      console.error(`Env ${key} not defined`);
      return "";
    }
    return value;
  });

  const projects = packageJson.workspaces;

  await Promise.all([
    projects.map((it) => {
      if (!it.startsWith(".")) {
        writeFile(resolve(process.cwd(), `./${it}/.env`), outputString);
      }
    }),
  ]);
})();
