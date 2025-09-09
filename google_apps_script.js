/**
 * Función principal para manejar las peticiones POST.
 * El servidor de Render enviará los datos a esta función.
 * @param {Object} e - Objeto de evento de la petición POST.
 */
function doPost(e) {
  // Configurar las cabeceras para permitir peticiones desde cualquier origen (CORS)
  // Esto es crucial para que el servidor de Render se comunique con este script
  const cabecerasCORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Manejar las peticiones OPTIONS preflight
  if (e.parameter.do === 'options') {
    return ContentService.createTextOutput().setMimeType(ContentService.MimeType.TEXT).setHeaders(cabecerasCORS);
  }

  try {
    // Analizar los datos JSON enviados en el cuerpo de la petición.
    const datosFormulario = JSON.parse(e.postData.contents);
    
    // Obtener la hoja de cálculo activa y la hoja específica por su nombre.
    // El nombre de la hoja debe ser "Registros" (tal como lo confirmaste).
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registros');
    
    // Preparar los datos para agregar una nueva fila.
    const nuevaFila = [
      new Date(), // Columna 1: Fecha de registro
      datosFormulario.nombre,
      datosFormulario.email,
      datosFormulario.celular,
      datosFormulario.edad,
      datosFormulario.residencia,
      datosFormulario.procedencia,
      datosFormulario.tiempoCreyente, // Nuevo campo
      datosFormulario.bautizoAgua, // Nuevo campo
      datosFormulario.bautismoEspirituSanto // Nuevo campo
    ];
    
    // Agregar la nueva fila de datos a la hoja de cálculo.
    hoja.appendRow(nuevaFila);
    
    // Devolver una respuesta exitosa en formato JSON.
    const respuestaJSON = { status: 'success', message: 'Registro exitoso' };
    return ContentService.createTextOutput(JSON.stringify(respuestaJSON)).setMimeType(ContentService.MimeType.JSON).setHeaders(cabecerasCORS);
    
  } catch (error) {
    // Si ocurre un error, registrarlo y devolver una respuesta de error en formato JSON.
    Logger.log("Error al procesar la petición: " + error.toString());
    const respuestaError = { status: 'error', error: 'Error interno del servidor. Intenta de nuevo.' };
    return ContentService.createTextOutput(JSON.stringify(respuestaError)).setMimeType(ContentService.MimeType.JSON).setHeaders(cabecerasCORS);
  }
}
