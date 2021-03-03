import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeamsController {
  public async index ({ auth }: HttpContextContract) {
    const teams = await auth.user?.related('teams').query() //.pivotQuery()

    return teams
  }

  public async store ({ request, auth }: HttpContextContract) {
    const data = request.only(['name'])

    const team = auth.user?.related('teams').create({
      ...data,
      user_id: auth.user.id // team manager
    })

    return team
  }

  public async show ({ params, auth }: HttpContextContract) {
    const team = await auth.user?.related('teams')
      .query().where('teams.id', params.id).first()

    return team
  }

  public async update ({ params, request, auth }: HttpContextContract) {
    const data = request.only(['name'])

    const team = await auth.user?.related('teams')
      .query().where('teams.id', params.id).first()

    if (!team) return 'Team not found'

    team.merge(data)
    await team.save()

    return team
  }

  public async destroy ({params, auth}: HttpContextContract) {
    const team = await auth.user?.related('teams')
      .query().where('teams.id', params.id).first()

    if (!team) return 'Team not found'

    await team.delete()
  }
}
