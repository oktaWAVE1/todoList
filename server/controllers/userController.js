const ApiError = require('../errors/ApiError')
const {User} = require('../models/models')
const tokenService = require('../service/tokenService')

class UserController {
    async registration (req, res, next) {
        try {
            const {email, password, name} = req.body
            if (!email || !password || !name) {

                return next(ApiError.badRequest('Не заполнены необходимые данные'))
            }
            const candidateEmail = await User.findOne({where: {email}})

            if (candidateEmail) {
                return next(ApiError.badRequest('Такой email уже зарегистрирован'))
            }
            const user = await User.create({email, password, name})
            return res.json({name: user.name, email: user.email, id: user.id})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async login (req, res, next) {
        try {

            const {authData, password} = req.body
            const user = await User.findOne({where: {email: authData}}) || await User.findOne({where: {name: authData}})

            if (!authData || !password) {
                return next(ApiError.badRequest('Не заполнены необходимые данные'))
            }

            if (!user) {
                return next(ApiError.badRequest("Такого пользователя не существует"))
            }

            if (user.password !== password) {
                return next(ApiError.internal("Введен неверный пароль"))
            }

            const token = tokenService.generateJwt({name: user.id, email: user.email, role: user.role});
            return res.json(token)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = tokenService.generateJwt({id: req.user.id, email: req.user.email, role: req.user.role})
        return res.json({token})
    }

}

module.exports = new UserController()