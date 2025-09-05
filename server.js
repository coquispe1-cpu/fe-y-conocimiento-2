const express = require('express');
const cors = require('cors'); // Importamos el paquete de CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON y habilitar CORS
app.use(express.json());
app.use(cors()); // Usamos el middleware de CORS para permitir peticiones desde el navegador

// Mensaje de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('El servidor de tu backend está funcionando correctamente.');
});

// Ruta para manejar el registro de nuevos usuarios
app.post('/api/registro', (req, res) => {
    // Los datos enviados desde el frontend están en req.body
    const nuevoUsuario = req.body;
    
    // Aquí es donde en el futuro guardaríamos los datos en una base de datos.
    // Por ahora, solo confirmamos la recepción de los datos en la terminal.
    console.log('Datos de nuevo usuario recibidos:', nuevoUsuario);

    // Enviamos una respuesta exitosa al frontend
    res.status(200).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
