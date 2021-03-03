import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  hasMany,
  HasMany,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'

import Default from './Default'
import Invite from './Invite'
import Team from './Team'

export default class User extends Default {

  @hasMany(() => Invite, { foreignKey: 'user_id' })
  public invites: HasMany<typeof Invite>

  @manyToMany(() => Team, { pivotTable: 'user_teams' })
  public teams: ManyToMany<typeof Team>

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

