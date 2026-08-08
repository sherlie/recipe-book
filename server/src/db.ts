import { default as knex } from "knex";

export const database = knex({
  client: "mysql2",
  connection: {
    host: "mysql",
    port: 3306,
    user: "recipe-book",
    password: "recipe-book-pwd",
    database: "db-recipe-book",
  },
  migrations: {
    directory: "./src/migrations",
  },
});

export async function initDatabase() {
  await database.migrate.latest();
}
