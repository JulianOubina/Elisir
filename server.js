require('./config/db');
const express = require('express')
const cookieParser = require('cookie-parser')
const app = require('express')();
const port = 3030;
const UserRouter = require('./api/user')
const FavsRouter = require('./api/favs')
const OpinionRouter = require('./api/opinions')
const bodyParser = require('express').json;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const cors = require('cors');

let user = require('./models/user');

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's origin
    credentials: true
  }));
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's origin
    credentials: true
  }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only set cookies over HTTPS in production
        sameSite: 'lax', // Can be 'strict', 'lax', or 'none'
      }
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(flash())
app.use(bodyParser());
app.use('/favs',FavsRouter)
app.use('/user',UserRouter)
app.use('/opinions',OpinionRouter)
app.listen(port,()=>{
    console.log(`Server corriendo en el puerto ${port}`);
})