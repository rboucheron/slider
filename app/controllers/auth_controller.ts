import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async github_callback({ ally, response, view }: HttpContext) {
    const gh = ally.use('github')

    if (gh.accessDenied()) {
      return response.badRequest('Access was denied by the user')
    }

    if (gh.stateMisMatch()) {
      return response.badRequest('We are unable to verify the request. Please try again')
    }

    if (gh.hasError()) {
      return response.badRequest(gh.getError())
    }

    const githubUser = await gh.user()

    let user = await User.query().where('email', githubUser.email).first()

    if (!user) {
      user = await User.create({
        fullName: githubUser.name,
        email: githubUser.email,
        login: githubUser.original.login,
        avatar: githubUser.avatarUrl,
      })
    }

    try {
      const token = await User.accessTokens.create(user)
      response.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
      })

      return view.render('pages/home', { user })
    } catch (error) {
      return response.internalServerError('An unexpected error occurred during authentication.')
    }
  }
}
