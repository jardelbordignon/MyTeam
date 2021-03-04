import { afterCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Default from './Default'
import User from './User'
import Team from './Team'

export default class Invite extends Default {

  @column()
  public user_id: number

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @column()
  public team_id: number

  @belongsTo(() => Team, { foreignKey: 'team_id' })
  public team: BelongsTo<typeof Team>

  @column()
  public email: string

  @afterCreate()
  public static async sendInvitationEmail (invite: Invite) {
    const { email } = invite
    const invited = await User.findBy('email', email)

    if (invited) {
      await invited.related('teams').attach([invite.team_id])
    } else {
      console.log('Criar conta')
    }
  }

}
