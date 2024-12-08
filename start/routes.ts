/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const SliderController = () => import('#controllers/sliders_controller')

router.on('/').render('pages/home')

router.on('/login').render('pages/login')

router.get('/slide/new', [SliderController, 'creatSlideView']).use(middleware.auth)

router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})

router.get('/github/callback', [AuthController, 'github_callback'])
