import "dotenv/config";
import { env } from "./config/env";
import { buildApp } from "./app";

const start = async () => {
  try {
    const app = await buildApp();

    const port = Number(process.env.PORT) || 3000;

    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    app.log.info(`Identity Service running on port: ${port}`);

    const shutdown = async () => {
      app.log.info("Shutting down...");
      await app.close();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

start();
