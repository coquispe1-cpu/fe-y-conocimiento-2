async function handleRegistro(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const edad = document.getElementById('edad').value;
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
    
    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        celular: celular,
        edad: edad,
        pais: pais,
        ciudad: ciudad
    };
    
    try {
        const response = await fetch('https://fe-y-conocimiento-2.onrender.com/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registro exitoso:', data);
            
            // Si el registro fue exitoso en el servidor,
            // guardamos los datos en el localStorage y redirigimos.
            localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));
            window.location.href = 'cuestionario.html';
        } else {
            console.error('Error al registrar usuario:', response.statusText);
        }

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}

// Ahora, asegúrate de que el evento de escucha apunte al formulario
document.getElementById('registro-form').addEventListener('submit', handleRegistro);
