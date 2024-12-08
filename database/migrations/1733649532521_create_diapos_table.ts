import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'diapos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('slides_id')
        .unsigned()
        .references('id')
        .inTable('slides')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.json('content').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
