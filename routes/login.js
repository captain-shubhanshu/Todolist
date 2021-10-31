const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req,res)=>{
    res.render('login', {
        title: 'Login'
    })    
})

router.post('/', (req,res,next)=>{
    if(req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, (err, user)=>{
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
