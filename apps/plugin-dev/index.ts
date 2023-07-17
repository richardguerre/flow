import express from "express";
import path from "node:path";
import cors from "cors";

const PORT = process.env.PORT ?? 4040;

const app = express();

const patchToPlugins = path.join(__dirname, "../../plugins");

// this prevents flakey CORS errors when running the app.
app.use(cors());

app.use(
  express.static(patchToPlugins, {
    setHeaders: () => ({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/javascript; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
      "Last-Modified": new Date().toUTCString(),
    }),
  })
);

app.listen(PORT, () => {
  console.log(`✅ Server started at: http://localhost:${PORT}`);
});
