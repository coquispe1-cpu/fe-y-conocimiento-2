document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // **IMPORTANTE**: Reemplaza esta URL con la URL de tu servicio en Render.
        const serverURL = 'https://fe-y-conocimiento-2.onrender.com/api/registro';

        try {
            const response = await fetch(serverURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('¡Registro exitoso!');
                form.reset();
            } else {
                alert('Hubo un error en el registro: ' + result.error);
            }

        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
        }
    });
});
