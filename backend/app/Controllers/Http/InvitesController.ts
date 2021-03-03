import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InvitesController {

  public async store ({ request, response }: HttpContextContract) {
    console.log(request.team)
  }

}
