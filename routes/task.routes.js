const {Router} = require('express')
const Task = require('../models/Task')
const User = require('../models/User')
const Group = require('../models/Group')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    const {form = {}} = req.body
    try {
        const task = new Task({
            owner: req.user.userId,
            group: req.user.groupId,
            ...form
        })

        await task.save()
            .then(doc => {
                res.status(201).json({task})
            })
            .catch(err => {
                res.status(500).json({err})
            });

        // res.status(201).json({task})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.user.groupId)
        const tasks = await Task.find({group: req.user.groupId})
        const users = await User.find()
        const usrs = await users.map(e => {
            e = e.toJSON()
            return e
        })
        const listResult = await tasks.map(function (e) {
            e = e.toJSON()
            const email = usrs.find(f => (String(f._id) === String(e.owner)))
            e.group = group.role
            e.owner = email && email.email
            return e
        });
        res.json(listResult)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.user.groupId)
        const task = await Task.findById(req.params.id)
        const users = await User.find()
        const usrs = await users.map(e => {
            e = e.toJSON();
            return e;
        })
        const result = task.toJSON();
        const email = usrs.find(f => (String(f._id) === String(result.owner)))
        result.group = group.role
        result.owner = email && email.email

        res.json(result)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const existing = await Task.findById(req.params.id)
        if (existing) {
            await Task.deleteOne({_id: req.params.id})
            return res.json(existing)
        }
        res.status(404).json({message: 'Задачи не существет'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router
