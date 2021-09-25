import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterController {
    public async show({ auth }: HttpContextContract) {
        return { user: auth.user }
    }
}
