const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 10000;
const fetch = require('node-fetch');

app.use(express.json());
app.use(cors());

// **IMPORTANTE**: Reemplaza esta URL con la que obtuviste de Google Apps Script.
const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbw2DDuzzG1SWPy_-Z0owjhFdsOJS5GgirdvBCiW9fKfXfrtLbfCncBiE6SHLOka6OnZ/exec'; 

app.post('/api/registro', async (req, res) => {
    const nuevoUsuario = req.body;
    
    console.log('Datos de nuevo usuario recibidos:', nuevoUsuario);

    try {
        // Reenviar los datos al Google Apps Script.
        const response = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            body: JSON.stringify(nuevoUsuario),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta de Google Apps Script:', data);
        
        res.status(200).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al enviar datos a Google Apps Script:', error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario en la hoja de cálculo.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
