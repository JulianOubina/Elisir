const express = require('express');
const router = express.Router();
const Opinion = require('./../models/opinion');

router.post('/', async (req, res)=>{
    let {nombre,vino,estrellas,titulo,texto} = req.body;
    if(nombre == ""||vino == ""||titulo == ""||texto == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'
        
        })
    }
    nombre = nombre.trim();
    vino = vino.trim();
    titulo = titulo.trim();
    texto = texto.trim();
    
    await Opinion.findOneAndUpdate({nombre:nombre,vino:vino},{$set:{estrellas:estrellas,titulo:titulo,texto:texto}},{upsert:true,strict:false})
    res.json(
        {status:'success'}
    )
})

router.get('/',async (req,res)=>{

    let {vino} = req.body;
    if(vino == ""){
        return res.json({
            status:'failed',
            message:'inputs vacios'
        
        })
    }
    vino = vino.trim();
    query = await Opinion.find({vino:vino})
    res.json(query)



})


module.exports = router;