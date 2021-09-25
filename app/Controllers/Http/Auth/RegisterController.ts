import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterController {
    public async store({ auth, request, response }: HttpContextContract) {
        const { name, email, password } = await request.validate({
            schema: schema.create({
                name: schema.string({}, [
                    rules.minLength(5),
                    rules.maxLength(70)
                ]),
                email: schema.string({}, [
                    rules.email(),
                    rules.unique({ table: 'users', column: 'email' })
                ]),
                password: schema.string({}, [
                    rules.confirmed(),
                    rules.minLength(8)
                ])
            })
        })

        try {
            const user = await User.create({ name, email, password })

            const token = await auth.use('api').login(user)

            return { token }
        } catch (e) {
            return response.badRequest({ error: e })
        }
    }
}
