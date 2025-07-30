// src/Drizzle/migrate.ts
import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

async function migration() {
  console.log("......Migration Started.....");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const db = drizzle(client, { schema });

    await migrate(db, {
      migrationsFolder: __dirname + "/migrations",
    });

    console.log("......Migrations Completed......");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
    process.exit(0); // 0 means success
  }
}

migration();
