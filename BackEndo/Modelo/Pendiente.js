const mongoose = require('mongoose');

const PendienteSchema = mongoose.Schema({
    Titulo: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    Fecha: {
        type: Date,
        required: true
    },
    Estado: {
        type: String,
        enum: ['Pendiente', 'Completado'],
        default: 'Pendiente'
    },
    Prioridad: {
        type: String,
        enum: ['Baja', 'Media', 'Alta'],
        default: 'Media'
    },
    FechaCreacion: {
        type: Date,
        default: Date.now
    },
    FechaActualizacion: {
        type: Date,
        default: Date.now
    },
    Usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Pendiente = mongoose.model('Pendiente', PendienteSchema);
module.exports = Pendiente;