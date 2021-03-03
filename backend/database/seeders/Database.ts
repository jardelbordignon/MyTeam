import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class DatabaseSeeder extends BaseSeeder {
  public async run () {
    const user = await User.create({
      name: 'Jardel Bordignon',
      email: 'jardel@bordignon.dev',
      password: '123456'
    })

    await user.related('teams').create({
      user_id: user.id,
      name: 'bordignon.dev',
      slug: ''
    })
  }
}
