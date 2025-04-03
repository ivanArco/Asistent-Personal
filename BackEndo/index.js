const express = require('express');
const mongoose = require('mongoose');
// Importando librería CORS
const cors = require('cors');

// Importando rutas de usuario
const userRoute = require('./Ruta/UsuarioRuta');
const Pendiente = require('./Ruta/PendienteRuta');

const app = express();

// Agregando el parser JSON de Express
app.use(express.json());

// Middleware para configurar encabezados globales
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json'); // Configurar Content-Type como JSON
    next();
});

// Middleware de CORS para consumo de APIs
app.use(cors());

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de APIs de Asistente Personal');
});

// Manejo de favicon para evitar errores
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Devuelve una respuesta vacía para el favicon
});

// Endpoints para colección de usuarios y pendientes
app.use('/api/users', userRoute);
app.use('/api/pendientes', Pendiente);

// Realizar petición de conexión a MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/IA', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Se estableció la conexión a base de datos exitosamente');
        app.listen(3000, '0.0.0.0', () => {
            console.log('Servidor trabajando en el puerto 3000');
        });
    } catch (error) {
        console.error('Ocurrió un error en la conexión a la base de datos: ', error);
    }
}

connectDB();
