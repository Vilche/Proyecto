const mongoose = require('mongoose');

//const Mongo_Vil = 'mongodb://localhost:27017/Parcial';

const Mongo_Vil = 'mongodb+srv://Vilche:angellcy503@cluster0.11arq.mongodb.net/Proyecto?retryWrites=true&w=majority'

//modelos
const User = require('./models/User');
const Reservacion = require('./models/Reservaciones');
const admin = require('./models/admin');


class Controlador {
    constructor() {
        this.connect();
    }
    async connect() {
        try {
            await mongoose.connect(Mongo_Vil, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.info('Conexión exitosa');
        } catch (err) {
            console.error(err);
        }
    }

    //Consultas

    //Creando un usuario y mostrando un error en caso de que lo haya
    addUser(res, data) {
        User.create(data, (err, newUser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Creado',
                user: newUser
            })
        })
    }
    login(res, data) {
        User.findOne({
            $and: [
                { email: data.email },
                { password: data.password }
            ]
        }, (err, user) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'oki',
                user
            })
        })
    }

    updateUser(res, id, data) {
        User.updateOne({
            _id: id
        }, data, (err, updatedUser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Actualizado',
                user: updatedUser
            })
        })
    }

    getUser(res, id) {
        User.findOne({
            _id: id
        }, (err, user) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Todo bien',
                user
            })
        })
    }

    deleteUser(res, id) {
            User.deleteOne({
                _id: id
            }, (err) => {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: 'Eliminado',
                })
            })
        }
        // Procesos Reservaciones
    addSolicitud(res, data) {
        Reservacion.create(data, (err, newRes) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Solicitud enviada',
                newRes
            })
        })
    }

    getSolicitud(res, userId) {
        Reservacion.find({
            id_user: userId
        }, (err, Resers) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Encontradas',
                Resers
            })
        })

    }

    updateSolicitud(res, id, data) {
        Reservacion.updateOne({
            _id: id
        }, data, (err, updatedReser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Actualizada',
                updatedReser
            })
        })
    }
    deleteSolicitud(res, id) {
        Reservacion.deleteOne({
            _id: id
        }, (err) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Borrada',
            })
        })
    }

    //metodos para admin
    getSolicitudes(res) {
        Reservacion.find({}, (err, Resers) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Encontradas',
                Resers
            })
        })
    }

    addAdmin(res, data) {
        admin.create(data, (err, newAdmin) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Eres Admin',
                newAdmin
            })
        })
    }

    loginAdmin(res, data) {
        admin.findOne({
            $and: [
                { nombre: data.nombre },
                { password: data.password }
            ]
        }, (err, admin) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'El admin',
                admin
            })
        })
    }


    getAdmin(res, id) {
        admin.findOne({
            _id: id
        }, (err, admin) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Todo bien',
                admin
            })
        })
    }

    deleteAdmin(res, id) {
        admin.deleteOne({
            _id: id
        }, (err) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'ya no eres admin :c',
            })
        })
    }




}

exports.db = new Controlador();