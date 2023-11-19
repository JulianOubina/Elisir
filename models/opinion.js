const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OpinionSchema = new Schema({
    nombre:String,
    vino:String,
    estrellas:Number,
    titulo:String,
    texto:String
})



const Opinion = mongoose.model('Opinion',OpinionSchema);

module.exports = Opinion;