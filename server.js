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
    const nuevoUsuario = req.body;
    
    console.log('Datos de nuevo usuario recibidos:', nuevoUsuario);

    try {
        const response = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud a Google Apps Script: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Error al enviar los datos a Google Apps Script:', error);
        res.status(500).json({ error: 'Hubo un error en el registro.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
