const Pendiente = require('../Modelo/Pendiente');
const User = require('../Modelo/Usuario');

// Crear un pendiente
const createPendiente = async (req, res) => {
    try {
        const { userId, titulo, descripcion, fecha, estado, prioridad } = req.body;

        // Crear un nuevo pendiente
        const nuevoPendiente = new Pendiente({
            Titulo: titulo,
            Descripcion: descripcion,
            Fecha: fecha,
            Estado: estado,
            Prioridad: prioridad,
            Usuario: userId
        });

        // Guardar el pendiente
        nuevoPendiente.FechaActualizacion = Date.now();
        const pendienteGuardado = await nuevoPendiente.save();

        // Actualizar el usuario con la referencia al nuevo pendiente
        await User.findByIdAndUpdate(userId, { $push: { Pendientes: pendienteGuardado._id } });

        res.status(201).json(pendienteGuardado);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Recuperar todos los pendientes
const getPendientes = async (req, res) => {
    try {
        const pendientes = await Pendiente.find().populate('Usuario', 'Nombre Correo');
        res.status(200).json(pendientes);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Recuperar un pendiente por su ID
const getPendienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const pendiente = await Pendiente.findById(id).populate('Usuario', 'Nombre Correo');
        if (!pendiente) {
            return res.status(404).json({ message: 'Pendiente no encontrado' });
        }
        res.status(200).json(pendiente);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Actualizar un pendiente por su ID
const updatePendienteById = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.FechaActualizacion = Date.now();
        const pendienteActualizado = await Pendiente.findByIdAndUpdate(id, req.body, { new: true });
        if (!pendienteActualizado) {
            return res.status(404).json({ message: 'Pendiente no encontrado' });
        }
        res.status(200).json(pendienteActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

// Eliminar un pendiente por su ID
const deletePendienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const pendienteEliminado = await Pendiente.findByIdAndDelete(id);
        if (!pendienteEliminado) {
            return res.status(404).json({ message: 'Pendiente no encontrado' });
        }

        // Actualizar el usuario para eliminar la referencia al pendiente
        await User.findByIdAndUpdate(pendienteEliminado.Usuario, { $pull: { Pendientes: id } });

        res.status(200).json({ message: 'Pendiente eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error ' + error.message });
    }
}

module.exports = {
    createPendiente,      // Crear un pendiente
    getPendientes,        // Recuperar todos los pendientes
    getPendienteById,     // Recuperar un pendiente por su ID
    updatePendienteById,  // Actualizar un pendiente por su ID
    deletePendienteById   // Eliminar un pendiente por su ID
}