// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class SlidersController {
  async creatSlideView({ view }: HttpContext) {
    return view.render('pages/create')
  }
}
