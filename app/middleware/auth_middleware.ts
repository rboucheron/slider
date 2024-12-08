import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.cookie('auth_token')
    if (!token) {
      return ctx.response.redirect(this.redirectTo)
    }
    try {
      await ctx.auth.use('api').authenticate({ token })
      await next()
    } catch (error) {
      console.error('Authentication failed:', error)
      return ctx.response.redirect(this.redirectTo)
    }
  }
}
