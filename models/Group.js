const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    role: {type: String, required: true, unique: true},
    tasks: [{ type: Types.ObjectId, ref: 'Task' }],
    users: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = model('Group', schema)
