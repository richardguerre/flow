import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";
import { writeFile, readFile, readdir } from "fs/promises";
import { resolve } from "path";

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
  const projects = await readdir(resolve(process.cwd(), "projects"));

  await Promise.all([
    projects.map((it) => {
      if (it === "backend") {
        writeFile(
          resolve(process.cwd(), `projects/${it}/.env`),
          outputString.replace(/DATABASE_URL(.*)/, "")
        );
      } else if (!it.startsWith("."))
        writeFile(resolve(process.cwd(), `projects/${it}/.env`), outputString);
    }),
  ]);
})();
