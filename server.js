const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar el servidor para procesar datos JSON
app.use(express.json());

// Mensaje de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('El servidor de tu backend está funcionando correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
