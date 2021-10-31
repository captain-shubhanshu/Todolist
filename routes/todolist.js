const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Todo = require('../models/todos')

router.get('/', (req,res,next)=>{
    if(!req.session.userId) {
        return res.redirect('/login')
    }
    User.findById(req.session.userId).lean().exec((err, user)=>{
        if (err) return next(err)
        Todo.find({userId: user._id}).lean().exec((err, todolist)=>{
            if (err) return next(err)
            return res.render('todolist', {
                title: 'Todolist',
                style: 'style.css',
                user,
                todolist
            })
        })
    })
})

router.post('/', (req,res,next)=>{
    if(req.body.task && req.body.status) {
        task_data = {
            task: req.body.task,
            status: req.body.status,
            userId: req.session.userId
        }
        Todo.findOne({task: task_data['task'], userId: task_data['userId']}, (err, todo)=>{
            if(err) return next(err)
            else if(todo) {
                Todo.updateOne({
                    task: todo['task'],
                    userId: todo['userId']
                }, {status: task_data['status']}, (err, result)=>{
                    if(err) return next(err)
                    return res.redirect('/todolist')
                })
            }
            else {
                Todo.create(task_data, (err, task)=>{
                    if(err) return next(err)
                    return res.redirect('/todolist')
                })
            }
        })
    }
    else {
        let err = new Error('Please enter all the details!')
        err.status = 401
        return next(err)
    }
})

module.exports = router
