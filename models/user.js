const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Todo"
        }
    ]
})

// UserSchema.statics.authenticate = (username, password, next)=>{  // adding a function to schema.statics
//     User.findOne({username}, (err, user)=>{
//         if(err) return next(err)
//         else if(!user) {
//             let err = new Error('User does not exists!')
//             err.status = 401
//             return next(err)
//         }
//         else if(user.password != password) {
//             let err = new Error('Incorrect password!')
//             err.status = 400
//             return next(err)
//         }
//         return next(null, user)
//     })
// }
UserSchema.static('authenticate',  (username, password, next)=>{      // explicitly calling Schema#static() function
    User.findOne({username}, (err, user)=>{
        if(err) return next(err)
        else if(!user) {
            let err = new Error('User does not exists!')
            err.status = 401
            return next(err)
        }
        else if(user.password != password) {
            let err = new Error('Incorrect password!')
            err.status = 400
            return next(err)
        }
        return next(null, user)
    })
})

const User = model('User', UserSchema)
module.exports = User