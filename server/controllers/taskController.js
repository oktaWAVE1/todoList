const {Task} = require('../models/models')
const ApiError = require('../errors/APIError')

class TaskController {
    async create (req, res, next) {
        try {
            let {email, name, taskText} = req.body
            const taskBody = await Task.create({email, name, taskText})
            return res.json(taskBody)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getTasks (req, res) {
        let {limit, page, order, orderDirection} = req.query
        page = page || 1
        limit = limit || 3
        order = order || 'createdAt'
        orderDirection = orderDirection || 'ASC'
        let offset = page * limit - limit
        const tasks = await Task.findAndCountAll({limit, offset, order: [[order, orderDirection]]})
        return res.json(tasks)
    }

    async update (req, res, next) {
        try{
            const {taskText, done, id, edited} = req.body
            const task = await Task.update({taskText, done, edited}, {
                where: {id},
            })
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TaskController()