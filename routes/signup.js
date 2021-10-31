const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res)=>{
    res.render('signup', {
        title: 'Sign Up'
    })  
})

router.post('/', (req, res, next)=>{
    if(req.body.fname && req.body.lname && req.body.username && req.body.emailId && req.body.password) {
        let user_data = {
            firstname: req.body.fname,
            lastname: req.body.lname,
            username: req.body.username,
            email: req.body.emailId,
            password: req.body.password
        }
        User.create(user_data, (err, user)=>{
            if (err) return next(err)
            req.session.userId = user._id
            return res.redirect('/todolist')
        })
    }
    else {
        let err = new Error('Please enter all the details')
        err.status = 400
        return next(err)
    }
})

module.exports = router
