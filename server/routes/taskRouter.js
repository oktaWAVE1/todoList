const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', taskController.create)
router.put('/', authMiddleware, taskController.update)
router.get('/', taskController.getTasks)

module.exports = router