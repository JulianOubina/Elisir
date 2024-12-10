const express = require('express');
const router = express.Router();

const User = require('./../models/user');

const bcrypt = require('bcrypt');

//Registro

router.post('/register',(req,res)=>{
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
        User.find({email}).then(result=>{
            if(result.length){
                res.json({
                    status:'failed',
                    message:'contraseña muy corta'
                
                })   
            } else{
                const saltRounds = 10;
                bcrypt.hash(password,saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        nombre,
                        email,
                        password: hashedPassword,
                        fechaNac
                    });
                    newUser.save().then(result =>{
                        res.json({
                            status:'success',
                            message:'usuario creado',
                            data:result
                        
                        })


                    })


                })



            }

        }).catch(err =>{
            console.log(err)
        })



    }

})

router.post('/login',(req,res)=>{
    let {email,password} = req.body;
    email = email.trim();
    password = password.trim();
    User.find({email})
    .then(data =>{
        if(data[0]){
            const hashedPassword = data[0].password;
            bcrypt.compare(password,hashedPassword).then(result=>{
                if(result){
                    //acceso
                    console.log('exito')   

                }
                else{
                    //contraseña incorrecta render
                    console.log('contrasenia incorrecta');
                }

            })


        }else{
            console.log('no existe usuario');
        }
    }).catch(err =>{
        console.log(err)
    })
})

module.exports = router;