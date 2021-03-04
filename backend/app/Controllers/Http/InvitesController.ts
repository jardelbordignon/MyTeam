import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Invite from 'App/Models/Invite'

export default class InvitesController {

  public async store ({ request, auth }: HttpContextContract) {
    if (!auth.user) return null
    const invites = request.input('invites')

    const data = invites.map((email: string) => ({
      email,
      user_id: auth.user?.id,
      team_id: request.team.id
    }))

    await Invite.createMany(data)
  }

}
