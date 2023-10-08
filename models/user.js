const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    nombre:String,
    email:String,
    password:String,
    fechaNac:Date

})


UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',UserSchema);

module.exports = User;