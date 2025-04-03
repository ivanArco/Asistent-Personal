const User = require('../Modelo/Usuario');
const Pendiente = require('../Modelo/Pendiente');

// Crear un usuario
const createUser = async (req, res) => {
    try {
        // Crear un usuario y guardarlo
        const Usuario = await User.create(req.body);

        // Enviar la respuesta con el usuario creado
        res.status(201).json(Usuario);

        // Elimina cualquier respuesta adicional (como esta línea que estaba en tu código original):
        // res.status(200).json(Usuario); <-- Esto causa el error
    } catch (error) {
        // Responder con un error en caso de fallo
        res.status(500).json({ message: 'Ocurrió un error: ' + error.message });
    }
};

// Recuperar todos los usuarios
const getUsers = async (req, res) => {
    try {
        const usuarios = await User.find().populate('Pendientes', 'Titulo Descripcion Fecha');
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Recuperar un usuario por su ID
const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findById(id).populate('Pendientes', 'Titulo Descripcion Fecha');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Recuperar un usuario por su correo
const getUsersByCorreo = async (req, res) => {
    try {
        const { Correo } = req.params;
        const usuario = await User.find({ "Correo": Correo });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Recuperar un usuario por su correo y contraseña
const getUsersByCorreoPass = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await User.findOne({ Correo: correo, Password: password }).populate('Pendientes', 'Titulo Descripcion Fecha');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Actualizar un usuario por su ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Eliminar un usuario por su ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await User.findByIdAndDelete(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar todos los pendientes asociados al usuario
        await Pendiente.deleteMany({ Usuario: id });

        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Iniciar sesión usando correo y contraseña
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await User.findOne({ Correo: correo, Password: password });
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUserById,
    deleteUserById,
    getUsersByCorreo,
    getUsersByCorreoPass,
    login
}