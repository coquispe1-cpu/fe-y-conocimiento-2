/**
 * Servidor Express para manejar las solicitudes del formulario.
 * Este servidor actúa como intermediario entre el formulario HTML y Google Apps Script.
 */
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
// Esto permite que el formulario en GitHub se comunique con este servidor.
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta principal para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.status(200).send('Servidor de registro activo.');
});

/**
 * Ruta para manejar la solicitud POST del formulario.
 * Esta ruta recibe los datos del formulario y los reenvía a Google Apps Script.
 */
app.post('/api/registro', async (req, res) => {
  try {
    // La URL de tu aplicación web de Google Apps Script
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbw2DDuzzG1SWPy_-Z0owjhFdsOJS5GgirdvBCiW9fKfXfrtLbfCncBiE6SHLOka6OnZ/exec';
    
    // Los datos enviados desde el formulario están en req.body
    const formData = req.body;
    
    // Reenviar los datos a Google Apps Script
    // Usamos axios para enviar una solicitud POST
    // Enviamos los datos en formato URL-encoded para que Google Apps Script los pueda leer fácilmente
    const response = await axios.post(googleAppsScriptUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Google Apps Script devuelve un objeto JSON en la respuesta.
    // Lo enviamos de vuelta al cliente (el formulario web).
    res.json(response.data);

  } catch (error) {
    console.error('Error al reenviar los datos a Google Apps Script:', error.message);
    res.status(500).json({ status: 'error', error: 'Error interno del servidor.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
