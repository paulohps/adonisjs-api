import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'LoginController.store').as('auth.login.store')
  Route.post('/logout', 'LoginController.destroy').as('auth.login.destroy')
  Route.post('/register', 'RegisterController.store').as('auth.register.store')
}).namespace('App/Controllers/Http/Auth')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'ProfileController.show').as('profile.show')
  }).prefix('profile')
}).middleware(['auth'])