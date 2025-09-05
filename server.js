const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

app.post('/api/registro', (req, res) => {
    const nuevoUsuario = req.body;
    
    // Aquí es donde se reciben y muestran los datos del formulario.
    console.log('Datos de nuevo usuario recibidos:', nuevoUsuario);

    res.status(200).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
