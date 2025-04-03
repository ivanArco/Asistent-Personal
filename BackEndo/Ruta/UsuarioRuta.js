const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUsersById,
    createUser,
    updateUserById,
    deleteUserById,
    getUsersByCorreo,
    getUsersByCorreoPass,
    login
} = require('../Controlador/UsuarioControlador');

// Endpoint para la recuperación de la colección de usuarios
router.get('/all', getUsers);

// Endpoint para la recuperación de un usuario usando su identificador
router.get('/byId/:id', getUsersById);

// Endpoint para la recuperación de un usuario usando su correo
router.get('/byCorreo/:correo', getUsersByCorreo);

// Endpoint para la recuperación de un usuario usando su correo y contraseña
router.post('/byCorreoPass', getUsersByCorreoPass);

// Endpoint para la creación de un usuario
router.post('/add', createUser);

// Endpoint para la actualización de un usuario usando su identificador
router.put('/update/:id', updateUserById);

// Endpoint para la eliminación de un usuario usando su identificador
router.delete('/delete/:id', deleteUserById);

// Endpoint para iniciar sesión usando correo y contraseña
router.post('/login', login);

module.exports = router;