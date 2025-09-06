const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middlewares
app.use(bodyParser.json());
app.use(cors());

// URL de tu script de Google Apps Script
// La URL ha sido actualizada con la que has proporcionado.
const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbw2DDuzzG1SWPy_-Z0owjhFdsOJS5GgirdvBCiW9fKfXfrtLbfCncBiE6SHLOka6OnZ/exec';

// Ruta para recibir los datos del formulario
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Datos recibidos del formulario:', formData);

        // Enviar los datos al script de Google Apps Script
        const scriptResponse = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Asegurarse de que la respuesta del script de Google sea JSON válido
        if (scriptResponse.ok) {
            const scriptData = await scriptResponse.json();
            res.json(scriptData);
        } else {
            const errorText = await scriptResponse.text();
            res.status(500).json({ error: 'Error al comunicarse con Google Apps Script: ' + errorText });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ error: 'Hubo un error en el registro.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
