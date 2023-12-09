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
    await User.findOneAndUpdate({username:email},{$push:{favoritos:vino}},{strict:false})
    res.json(
        {status:'success'}
    )
})

router.post('/myWines',async (req, res)=>{
    let {email} = req.body;
    if(email == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'
        
        })
    }
    let userFound = await User.findOne({username:email})
    res.json(userFound.favoritos)

})

router.post('/delete', async (req, res) => {
    let { email, vino } = req.body;
    if (email === "" || !vino || !vino.name) {
        return res.json({
            status: 'failed',
            message: 'inputs vacíos'
        });
    }
    email = email.trim();

    try {
        await User.findOneAndUpdate(
            { username: email },
            { $pull: { favoritos: { name: vino.name } } }
        );
        res.json({ status: 'success' });
    } catch (error) {
        res.json({
            status: 'failed',
            message: error.message
        });
    }
});

module.exports = router;