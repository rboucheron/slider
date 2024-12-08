import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Slide extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slideName: string

  @column()
  declare userId: number
}
