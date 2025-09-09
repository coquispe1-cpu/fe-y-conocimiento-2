document.getElementById('registro-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const feedbackElement = document.getElementById('message-container');
    const registerButton = document.getElementById('register-button');

    // Mostrar mensaje de carga y deshabilitar botón
    feedbackElement.style.display = 'block';
    feedbackElement.innerHTML = 'Enviando... <span class="spinner"></span>';
    feedbackElement.className = 'loading';
    registerButton.disabled = true;

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // La URL de tu servidor en Render, con la ruta correcta
    const serverUrl = 'https://fe-y-conocimiento-2.onrender.com/submit-form';

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // La respuesta del servidor de Render es JSON
        const result = await response.json();

        if (response.ok && result.status === 'success') {
            feedbackElement.innerHTML = '¡Usuario registrado exitosamente!';
            feedbackElement.className = 'success';
            form.reset(); // Limpia el formulario
        } else {
            feedbackElement.innerHTML = result.error || 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.';
            feedbackElement.className = 'error';
        }
    } catch (error) {
        feedbackElement.innerHTML = 'Error de conexión. Por favor, verifica el servidor.';
        feedbackElement.className = 'error';
        console.error('Error:', error);
    } finally {
        registerButton.disabled = false;
    }
});
