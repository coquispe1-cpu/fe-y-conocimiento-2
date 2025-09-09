/**
 * Lógica para manejar el envío del formulario.
 * Envía los datos a un servidor backend para su procesamiento.
 */
document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');
    const messageContainer = document.getElementById('mensaje-feedback');
    const registerButton = document.querySelector('#registro-form button[type="submit"]');

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Ocultar mensaje y deshabilitar botón mientras se procesa
        if (messageContainer) {
            messageContainer.style.display = 'none';
        }
        if (registerButton) {
            registerButton.disabled = true;
            registerButton.textContent = 'Registrando...';
        }

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const edad = document.getElementById('edad').value;
        const residencia = document.getElementById('lugarResidencia').value;
        const procedencia = document.getElementById('paisProcedencia').value;

        const nuevoUsuario = {
            nombre,
            email,
            celular,
            edad,
            residencia,
            procedencia
        };

        // URL del servidor de Render corregida para que coincida con el servidor
        const urlBackend = 'https://fe-y-conocimiento-2.onrender.com/api/registro';

        try {
            const respuesta = await fetch(urlBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Mostrar mensaje de éxito
                if (messageContainer) {
                    messageContainer.textContent = '¡Usuario registrado exitosamente!';
                    messageContainer.className = 'mt-6 text-center text-sm font-medium text-green-600 block';
                }
                registroForm.reset();
            } else {
                // Mostrar mensaje de error del servidor
                if (messageContainer) {
                    messageContainer.textContent = `Error al registrar usuario: ${data.error || 'Intenta de nuevo.'}`;
                    messageContainer.className = 'mt-6 text-center text-sm font-medium text-red-600 block';
                }
            }

        } catch (error) {
            // Mostrar mensaje de error de conexión
            if (messageContainer) {
                messageContainer.textContent = 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.';
                messageContainer.className = 'mt-6 text-center text-sm font-medium text-red-600 block';
            }
            console.error('Error al enviar el formulario:', error);
        } finally {
            // Volver a habilitar el botón
            if (registerButton) {
                registerButton.disabled = false;
                registerButton.textContent = 'Registrar';
            }
        }
    });
});
