import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
    public async store({ auth, request, response }: HttpContextContract) {
        const { email, password } = await request.validate({
            schema: schema.create({
                email: schema.string({}, [
                    rules.email()
                ]),
                password: schema.string()
            })
        })

        try {
            const token = await auth.use('api').attempt(email, password)

            return { token }
        } catch {
            return response.badRequest({ message: 'Invalid credentials' })
        }
    }

    public async destroy({ auth }) {
        await auth.use('api').revoke()

        return {
            revoked: true
        }
    }
}
