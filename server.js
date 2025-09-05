const express = require('express');
const cors = require('cors'); // Middleware para permitir peticiones desde el frontend
const app = express();
const PORT = process.env.PORT || 10000; // Usamos el puerto 10000 para consistencia

// Middleware para procesar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// **IMPORTANTE**: La ruta app.get('/') ha sido eliminada.
// Tu servidor ahora solo responderá a las peticiones POST a /api/registro.

// Ruta para manejar el registro de nuevos usuarios
app.post('/api/registro', (req, res) => {
    // Los datos enviados desde el frontend están en req.body
    const nuevoUsuario = req.body;
    
    // Aquí es donde en el futuro guardaríamos los datos en una base de datos.
    // Por ahora, solo confirmamos la recepción de los datos en la terminal del servidor.
    console.log('Datos de nuevo usuario recibidos:', nuevoUsuario);

    // Enviamos una respuesta exitosa al frontend
    res.status(200).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
