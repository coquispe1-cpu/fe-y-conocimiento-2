document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const edad = document.getElementById('edad').value;
        const pais = document.getElementById('pais').value;
        const ciudad = document.getElementById('ciudad').value;

        const nuevoUsuario = {
            nombre,
            email,
            celular,
            edad,
            pais,
            ciudad
        };

        // URL del servidor de Render
        const urlBackend = 'https://fe-y-conocimiento-2.onrender.com/api/registro';

        try {
            const respuesta = await fetch(urlBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            });

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const data = await respuesta.json();
            console.log('Respuesta del servidor:', data);
            alert('¡Usuario registrado exitosamente!');

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al registrar usuario. Intenta de nuevo.');
        }
    });
});
