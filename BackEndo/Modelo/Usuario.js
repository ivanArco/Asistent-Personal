const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Nombre: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true,
        unique:true
    },
    Edad: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Pendientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pendiente'
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;