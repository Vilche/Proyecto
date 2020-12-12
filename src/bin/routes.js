const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); //inicializando express

//configuraciones
app.use(bodyParser.json());
app.use(cors());

const { db } = require('./db');
//rutas Usuarios
app.post('/api/users', (req, res) => {
    let data = req.body;
    db.addUser(res, data);
})

app.post('/api/login', (req, res) => {
    let data = req.body;
    db.login(res, data);
})

app.put('/api/users/:id', (req, res) => {
    let data = req.body;
    let { id } = req.params;
    db.updateUser(res, id, data);
})

app.get('/api/users/:id', (req, res) => {
    let { id } = req.params;
    db.getUser(res, id);

})

app.delete('/api/users/:id', (req, res) => {
    let { id } = req.params;
    db.deleteUser(res, id);
})

//Rutas Reservacciones

app.post('/api/solicitud/:userId', (req, res) => {
    let data = req.body;
    let { userId } = req.params;
    data.id_user = userId;
    db.addSolicitud(res, data);
})

app.get('/api/solicitud/:userId', (req, res) => {
    let { userId } = req.params;
    db.getSolicitud(res, userId);
})

app.put('/api/solicitud/:id', (req, res) => {
    let { id } = req.params;
    let data = req.body;
    db.updateSolicitud(res, id, data);
})

app.delete('/api/solicitud/:id', (req, res) => {
    let { id } = req.params;

    db.deleteSolicitud(res, id);
})

//get para admin (obtiene todas las solicitudes indepedientemente de su ID)
app.get('/api/solicitudes', (req, res) => {
    db.getSolicitudes(res);
})

app.post('/api/admin', (req, res) => {
    let data = req.body;
    db.addAdmin(res, data)
})

app.post('/api/loginAdmin', (req, res) => {
    let data = req.body;
    db.loginAdmin(res, data);
})

app.get('/api/admin/:id', (req, res) => {
    let { id } = req.params;
    db.getAdmin(res, id);
})

app.delete('/api/admin/:id', (req, res) => {
    let { id } = req.params;
    db.deleteAdmin(res, id);
})
exports.app = app; //exportando express