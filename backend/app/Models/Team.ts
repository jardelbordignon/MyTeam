import {
  beforeSave,
  column,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'

import Default from './Default'
import User from 'App/Models/User';
import Urlize from 'App/Utils/Urlize';

export default class Team extends Default {

  @manyToMany(() => User, { pivotTable: 'user_teams' })
  public users: ManyToMany<typeof User>

  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public slug: string

  @beforeSave()
  public static async slugfy (team: Team) {
    if (team.$dirty.name && !team.$dirty.slug) {
      team.$dirty.slug = Urlize(team.$dirty.name)
    }
  }
}
