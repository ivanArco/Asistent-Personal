const express = require('express');
const router = express.Router();
const {
    createPendiente,
    getPendientes,
    getPendienteById,
    updatePendienteById,
    deletePendienteById
} = require('../Controlador/PendienteControlador');

// Endpoint para la creación de un pendiente
router.post('/add', createPendiente);

// Endpoint para la recuperación de todos los pendientes
router.get('/', getPendientes);

// Endpoint para la recuperación de un pendiente usando su identificador
router.get('/:id', getPendienteById);

// Endpoint para la actualización de un pendiente usando su identificador
router.put('/update/:id', updatePendienteById);

// Endpoint para la eliminación de un pendiente usando su identificador
router.delete('/delete/:id', deletePendienteById);

module.exports = router;