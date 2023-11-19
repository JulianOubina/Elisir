const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    nombre:String,
    username:String,
    password:String,
    fechaNac:Date,
    genero:String,
    experiencia:Number,
    varietal:String,
    recomendaciones:String,
    bodegaFav:String,
    favoritos:Array,
    usuarioMeli:String

})


UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',UserSchema);

module.exports = User;