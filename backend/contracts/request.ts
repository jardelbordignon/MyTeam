import Team from 'App/Models/Team'

declare module '@ioc:Adonis/Core/Request' {

  interface RequestContract {
    team: Team
  }

}
