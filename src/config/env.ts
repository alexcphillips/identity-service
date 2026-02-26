type NodeEnv = "local" | "preprod" | "prod";

interface Env {
  NODE_ENV: NodeEnv;
  PORT: number;
  JWT_SECRET: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }

  return value;
}

function parsePort(value: string): number {
  const port = Number(value);

  if (Number.isNaN(port) || port <= 0) {
    console.error("PORT must be a valid positive number");
    process.exit(1);
  }

  return port;
}

function validateNodeEnv(value: string | undefined): NodeEnv {
  const allowed: NodeEnv[] = ["local", "preprod", "prod"];

  if (!value || !allowed.includes(value as NodeEnv)) {
    console.log(value);
    console.error(`NODE_ENV must be one of: ${allowed.join(", ")}`);
    process.exit(1);
  }

  return value as NodeEnv;
}

export const env: Env = {
  NODE_ENV: validateNodeEnv(process.env.NODE_ENV),
  PORT: parsePort(process.env.PORT || "3000"),
  JWT_SECRET: (() => {
    const secret = requireEnv("JWT_SECRET");

    if (secret.length < 32) {
      console.error("JWT_SECRET must be at least 32 characters long");
      process.exit(1);
    }

    return secret;
  })(),
};
