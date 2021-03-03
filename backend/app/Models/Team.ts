import { ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import Default from './Default'
import User from 'App/Models/User';

export default class Team extends Default {

  @manyToMany(() => User, { pivotTable: 'user_teams' })
  public users: ManyToMany<typeof User>

}
