/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("events", (table) => {
    table.bigIncrements("id")
    table.string("title").notNullable()
    table.string("date").notNullable()
    table.string("hours").notNullable()
    table.string("menu")
    table.string("forecastDate")
    table.string("comments")
    table.string("layoutTitle")
    table.string("layoutImg")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("events")
}
