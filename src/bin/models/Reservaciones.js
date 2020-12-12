const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//esquema para definir reservaciones
const ReservacionesSchema = new Schema({
    nombre: String,
    apellido: String,
    direccion: String,
    celular: Number,
    cantidad: Number,
    habitacionTipo: String,
    fecha: Date,
    numeroTarjeta: Number,
    Estado: {
        type: Boolean,
        default: false
    },

    id_user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
})

var Reservacion = mongoose.model('Reservacion', ReservacionesSchema);

module.exports = Reservacion;