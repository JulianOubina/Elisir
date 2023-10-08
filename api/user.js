const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/user');

const bcrypt = require('bcrypt');

//Registro

router.post('/register',(req,res,next)=>{
    let {nombre,email,password,fechaNac} = req.body;
    nombre = nombre.trim();
    email = email.trim();
    password = password.trim();
    fechaNac = fechaNac.trim();
    
    if(nombre == ""||email == ""||fechaNac == ""||password == ""){
        res.json({
            status:'failed',
            message:'inputs vacios'
        
        })

    }else if (!/^[a-zA-Z ]*$/.test(nombre)){
        res.json({
            status:'failed',
            message:'nombre invalido'
        
        })
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status:'failed',
            message:'email invalido'
        
        })
    }else if (password.length < 8){
        res.json({
            status:'failed',
            message:'contraseña muy corta'
        
        })
    }else{
        User.register(new User({ username:email,nombre:nombre,fechaNac:fechaNac}), password, (err, user) =>{
            if (err) {
                return res.json({
                    status:'failed',
                    message: err,
                })
            }
            res.redirect('/')
        })
         
    }

})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    res.redirect('/');
  });

module.exports = router;