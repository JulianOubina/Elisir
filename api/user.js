const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/user');

const bcrypt = require('bcrypt');

//Registro

router.post('/register',(req,res,next)=>{
    let {nombre,genero,username,password,fechaNac,bodegaFav,varietal,experiencia,recomendaciones} = req.body;
    nombre = nombre.trim();
    username = username.trim();
    password = password.trim();
    fechaNac = fechaNac.trim();
    genero = genero.trim();
    varietal = varietal.trim();
    recomendaciones = recomendaciones.trim();
    bodegaFav = bodegaFav.trim();
    
    if(nombre == ""||username == ""||fechaNac == ""||password == ""){
        res.json({
            status:'failed',
            message:'inputs vacios'
        
        })

    }else if (!/^[a-zA-Z ]*$/.test(nombre)){
        res.json({
            status:'failed',
            message:'nombre invalido'
        
        })
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)){
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
        User.register(new User({ username:username,nombre:nombre,fechaNac:fechaNac,genero:genero,experiencia:experiencia,varietal:varietal,recomendaciones:recomendaciones,bodegaFav:bodegaFav,favoritos:[],usuarioMeli:""}), password, (err, user) =>{
            if (err) {
                return res.json({
                    status:'failed',
                    message: err,
                })
            }
            res.json({status:'success'})
        })
         
    }

})

router.post('/login', passport.authenticate('local', { failureFlash: true,failureMessage:true }), function(req, res) {
    res.json({status:'success', user: req.user});
  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid'); // Replace 'connect.sid' with your cookie's name
  });

router.get('/', (req,res) => {
    if (req.isAuthenticated()) {
        return res.json({user: req.user});
    } else {
        return res.json({user:'not authenticated'});
    }
})

router.post('/meli',async (req,res)=>{
    if(req.body.userName == ""||req.body.userMeli == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'   
        })
    }
    nuevo = await User.findOneAndUpdate({username:req.body.userName},{$set:{usuarioMeli:req.body.userMeli}},{new:true})
    res.json({status:'success',nuevo:nuevo})    
})
module.exports = router;