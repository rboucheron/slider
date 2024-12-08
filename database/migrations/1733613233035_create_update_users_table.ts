import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('login', 250).notNullable()
      table.text('avatar').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
