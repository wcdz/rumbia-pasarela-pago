/**
 * Funciones para manejar parámetros de URL
 */

/**
 * Obtener parámetros de la URL
 * @returns {Object} Objeto con los parámetros
 */
export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        // Datos de tarjeta
        cardNumber: params.get('cardNumber') || '4111 1111 1111 1111',
        expiryDate: params.get('expiryDate') || '12/30',
        cvv: params.get('cvv') || '123',
        cardName: params.get('name') || params.get('cardName') || '',
        email: params.get('email') || '',
        amount: params.get('amount') || '150.00',
        
        // Datos del cliente
        clienteDni: params.get('dni') || params.get('clienteDni'),
        clienteNombre: params.get('nombre') || params.get('clienteNombre'),
        clienteFechaNacimiento: params.get('fechaNacimiento') || params.get('clienteFechaNacimiento'),
        clienteGenero: params.get('genero') || params.get('clienteGenero'),
        clienteTelefono: params.get('telefono') || params.get('clienteTelefono'),
        clienteCorreo: params.get('correo') || params.get('clienteCorreo') || params.get('email'),
        
        // Datos de cotización
        cotizacionProducto: params.get('producto') || params.get('cotizacionProducto'),
        cotizacionId: params.get('cotizacionId') || params.get('idCotizacion'),
        periodoPagoPrimas: params.get('periodoPagoPrimas') || params.get('periodo'),
        porcentajeDevolucion: params.get('porcentajeDevolucion'),
        tasaImplicita: params.get('tasaImplicita'),
        devolucion: params.get('devolucion'),
        tablaDevolucion: params.get('tablaDevolucion'),
        sumaAsegurada: params.get('sumaAsegurada') || params.get('suma_asegurada'),
        primaAnual: params.get('primaAnual') || params.get('prima_anual'),
        edadActuarial: params.get('edadActuarial') || params.get('edad'),
        sexo: params.get('sexo') || params.get('clienteGenero')
    };
}

