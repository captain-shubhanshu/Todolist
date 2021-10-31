const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const path = require('path')
const routes = {
    login: require('./routes/login'),
    signup: require('./routes/signup'),
    logout: require('./routes/logout'),
    todolist: require('./routes/todolist')
}

const app = express()

async function main() {
    await mongoose.connect("mongodb://localhost:27017/data")
    return 'Connected to the mongodb server successfully'
}
main()
    .then(res => console.log(res))
    .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'aksdbkasb kddqwdiwqdiuvwq bwqd',
    resave: false,
    saveUninitialized: true,
}))


app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

Handlebars.registerHelper("ifCond", function(key, value, options) {
    return (key==value) ? options.fn(this) : options.inverse(this)
})

app.get('/', (req, res)=>{
    res.render('home', {
        title: 'Home Page'
    })
})

app.use('/login', routes.login)
app.use('/signup', routes.signup)
app.use('/todolist', routes.todolist)
app.use('/logout', routes.logout)


app.use((err, req, res, next)=>{
    return res.render('error', {
        title: 'Error',
        message: err.message
    })
})


app.listen(4444, ()=>{
    console.log('Server started at http://localhost:4444')
})