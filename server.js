const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

// **IMPORTANTE**: Reemplaza esta URL con la que obtuviste de Google Apps Script.
const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbw2DDuzzG1SWPy_-Z0owjhFdsOJS5GgirdvBCiW9fKfXfrtLbfCncBiE6SHLOka6OnZ/exec';

app.post('/api/registro', async (req, res) => {
    const { nombre, email, celular, edad, lugar_residencia, pais_procedencia } = req.body;

    // Crear un objeto con los datos del formulario.
    const formData = {
        Nombre: nombre,
        Email: email,
        Celular: celular,
        Edad: edad,
        'Lugar de residencia': lugar_residencia,
        'País de procedencia': pais_procedencia
    };

    try {
        const response = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        // Enviar una respuesta de éxito al cliente
        res.status(200).json({ mensaje: 'Usuario registrado exitosamente', datos: result });
        
    } catch (error) {
        console.error('Error al enviar los datos a Google Apps Script:', error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
