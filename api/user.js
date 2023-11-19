const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/user');

const bcrypt = require('bcrypt');

//Registro

router.post('/register',(req,res,next)=>{
    let {nombre,email,password,fechaNac,genero,experiencia,notas,varietal,recomendaciones,bodegaFav} = req.body;
    nombre = nombre.trim();
    email = email.trim();
    password = password.trim();
    fechaNac = fechaNac.trim();
    genero = genero.trim();
    notas = notas.trim();
    varietal = varietal.trim();
    recomendaciones = recomendaciones.trim();
    bodegaFav = bodegaFav.trim();
    
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
        User.register(new User({ email:email,nombre:nombre,fechaNac:fechaNac,genero:genero,experiencia:experiencia,notas:notas,varietal:varietal,recomendaciones:recomendaciones,bodegaFav:bodegaFav,favoritos:[],usuarioMeli:""}), password, (err, user) =>{
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

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true,failureMessage:true }), function(req, res) {
    res.json({status:'success'});
  });


router.get('/',(req,res) => {
    if (req.isAuthenticated()) {
        return res.json({user: req.user});
    } else {
        return res.json({user:'not authenticated'});
    }
})

router.post('/meli',async (req,res)=>{
    let {email,userMeli} = req.body;
    if(email == ""||userMeli == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'
        
        })
    }
    nuevo = await User.findOneAndUpdate({email:email},{$set:{usuarioMeli:userMeli}},{new:true})
    res.json({status:'success',nuevo:nuevo})    
})
module.exports = router;