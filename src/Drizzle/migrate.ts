import "dotenv/config";
import db, { client } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";


async function migration() {
    console.log("......Migration Started.....");
    await migrate(db, {migrationsFolder: __dirname + "/migrations"});
    await client.end();
    console.log("......Migrations Completed......");
    process.exit(0); //0 means success
}

migration().catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
})