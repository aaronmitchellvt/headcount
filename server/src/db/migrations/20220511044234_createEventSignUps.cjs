/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("eventSignUps", (table) => {
    table.bigIncrements("id")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("eventId").notNullable().unsigned().index().references("events.id")
    table.string("estimatedArrivalTime")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("eventSignUps")
}
