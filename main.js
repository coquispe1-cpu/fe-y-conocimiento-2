/**
 * Lógica para manejar el envío del formulario.
 * Envía los datos a un servidor backend para su procesamiento.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro-form');
    const messageContainer = document.getElementById('message-container');
    const registerButton = document.getElementById('register-button');

    // Reemplaza esta URL con la URL de tu servidor en Render
    // *** Pega aquí la URL de tu servidor de Render ***
    const renderServerUrl = 'Pega_aquí_tu_URL_de_Render';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Ocultar mensaje y deshabilitar botón mientras se procesa
        messageContainer.style.display = 'none';
        registerButton.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${renderServerUrl}/submit-form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito
                messageContainer.textContent = '¡Registro exitoso!';
                messageContainer.className = 'success';
                messageContainer.style.display = 'block';
                form.reset();
            } else {
                // Mostrar mensaje de error del servidor
                messageContainer.textContent = `Hubo un error en el registro: ${result.error || 'Hubo un error en el registro.'}`;
                messageContainer.className = 'error';
                messageContainer.style.display = 'block';
            }
        } catch (error) {
            // Mostrar mensaje de error de conexión
            messageContainer.textContent = 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.';
            messageContainer.className = 'error';
            messageContainer.style.display = 'block';
            console.error('Error:', error);
        } finally {
            // Volver a habilitar el botón
            registerButton.disabled = false;
        }
    });
});
