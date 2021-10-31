const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Todo', 'In Progress', 'In Testing', 'Done']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Todo = model('Todo', TodoSchema)
module.exports = Todo