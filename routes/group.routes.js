const {Router} = require('express')
const Group = require('../models/Group')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find()
        res.json(groups)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
