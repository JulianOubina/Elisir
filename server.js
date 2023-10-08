require('./config/db');
const express = require('express')
const cookieParser = require('cookie-parser')
const app = require('express')();
const port = 3000;
const UserRouter = require('./api/user')
const bodyParser = require('express').json;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

let user = require('./models/user');


passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(flash())
app.use(bodyParser());
app.use('/user',UserRouter)
app.listen(port,()=>{
    console.log(`Server corriendo en el puerto ${port}`);
})