const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    nombre: String,
    password: String
})

var admin = mongoose.model('admin', adminSchema);

module.exports = admin;