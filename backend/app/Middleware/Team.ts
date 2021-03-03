import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Team {
  public async handle (
    { request, response, auth }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (!auth.user) return null

    const slug = request.header('TEAM')

    if (slug) {
      const team = await auth.user?.related('teams').query()
        .where('slug', slug).first()

      if (!team) return response.status(401)

      request.team = team
      auth.user.currentTeam = team.id
    }

    await next()
  }
}
