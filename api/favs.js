const express = require('express');
const router = express.Router();
const User = require('./../models/user');


router.post('/', async (req, res)=>{
    let {email,vino} = req.body;
    if(email == ""||vino == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'
        
        })
    }
    email = email.trim();
    
    await User.findOneAndUpdate({email:email},{$push:{favoritos:vino}},{strict:false})
    res.json(
        {status:'success'}
    )
})

router.get('/',async (req, res)=>{
    let {email} = req.body;
    if(email == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'
        
        })
    }
    let userFound = await User.findOne({email:email})
    res.json(userFound.favoritos)

})

module.exports = router;