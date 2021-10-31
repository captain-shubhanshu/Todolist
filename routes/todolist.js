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
        Todo.findOne({task: req.body.task, userId: req.session.userId}, (err, todo)=>{
            curr_date = new Date().toLocaleString()
            if(err) return next(err)
            else if(todo) {
                if(req.body.status == todo['status']) {
                    let err = new Error(`${req.body.task} is already in ${req.body.status} status.`)
                    err.status = 401
                    return next(err)
                }
                else if(req.body.status != 'Done'){
                    if(todo['status']!='Done') {
                        Todo.updateOne({
                            task: todo['task'],
                            userId: todo['userId']
                        }, {status: req.body.status}, (err, result)=>{
                            if(err) return next(err)
                            return res.redirect('/todolist')
                        })
                    }
                    else {
                        Todo.updateOne({
                            task: todo['task'],
                            userId: todo['userId']
                        }, {status: req.body.status, startDateTime: curr_date, endDateTime: ''}, (err, result)=>{
                            if(err) return next(err)
                            return res.redirect('/todolist')
                        })
                    }
                }
                else if(req.body.status == 'Done' && todo['status'] != 'Done') {
                    Todo.updateOne({
                        task: todo['task'],
                        userId: todo['userId']
                    }, {status: req.body.status, endDateTime: curr_date}, (err, result)=>{
                        if(err) return next(err)
                        return res.redirect('/todolist')
                    })
                }
            }
            else {
                task_data = {
                    task: req.body.task,
                    status: req.body.status,
                    startDateTime: curr_date,
                    endDateTime: '',
                    userId: req.session.userId
                }
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
