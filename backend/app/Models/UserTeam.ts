import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Default from './Default'
import User from './User'

export default class UserTeam extends Default {

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}
