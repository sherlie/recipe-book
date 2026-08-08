import type { Knex } from "knex";

export function up(knex: Knex) {
  return knex.schema
    .createTable("ingredients", function (table) {
      table.uuid("id").primary();
      table.string("name", 100).notNullable();
      table.string("unit", 10);
      table.decimal("amount", 10, 2).notNullable();
      table.uuid("component_id").notNullable();
    })
    .createTable("components", function (table) {
      table.uuid("id").primary();
      table.string("name", 100);
      table.uuid("recipe_id").notNullable();
    })
    .createTable("recipes", function (table) {
      table.uuid("id").primary();
      table.string("name", 100).notNullable();
      table.string("method", 2000).notNullable();
    })
    .createTable("recipe_tags", function (table) {
      table.uuid("recipe_id").notNullable();
      table.uuid("tag_id").notNullable();
      table.primary(["recipe_id", "tag_id"]);
    })
    .createTable("tags", function (table) {
      table.uuid("id").primary();
      table.string("name", 20).notNullable();
    });
}

export function down() {
  throw new Error("Not implemented");
}
