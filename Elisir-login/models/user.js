const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre:String,
    email:String,
    password:String,
    fechaNac:Date

})

const User = mongoose.model('User',UserSchema);

module.exports = User;