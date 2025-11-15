/**
 * Servicio para manejar las operaciones de pago
 */

import { API_CONFIG, MOCK_DATA } from '../config/api.config.js';

/**
 * Envía la solicitud de emisión de póliza
 * @param {Object} paymentData - Datos del pago
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function emitirPoliza(paymentData) {
    try {
        console.log('🚀 Enviando petición a:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMITIR_POLIZA}`);
        console.log('📦 Payload:', JSON.stringify(paymentData, null, 2));
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
        
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EMITIR_POLIZA}`, 
            {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(paymentData),
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Respuesta exitosa del servidor:', data);
        
        return {
            success: true,
            data
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('⏱️ Timeout: La petición tardó demasiado');
            return {
                success: false,
                error: 'Timeout: La petición tardó demasiado'
            };
        }
        
        console.error('❌ Error al emitir póliza:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Construye el payload para la emisión de póliza
 * @param {Object} formData - Datos del formulario y URL params
 * @returns {Object} Payload formateado
 */
export function buildPaymentPayload(formData) {
    const amount = parseFloat(formData.amount) || 250.0;
    
    // Usar datos dinámicos de URL o fallback a MOCK_DATA
    const cliente = {
        dni: formData.clienteDni || MOCK_DATA.CLIENTE.dni,
        nombre: formData.clienteNombre || MOCK_DATA.CLIENTE.nombre,
        fechaNacimiento: formData.clienteFechaNacimiento || MOCK_DATA.CLIENTE.fechaNacimiento,
        genero: formData.clienteGenero || MOCK_DATA.CLIENTE.genero,
        telefono: formData.clienteTelefono || MOCK_DATA.CLIENTE.telefono,
        correo: formData.clienteCorreo || MOCK_DATA.CLIENTE.correo
    };
    
    const edadActuarial = parseInt(formData.edadActuarial) || 35;
    const sexo = formData.sexo || formData.clienteGenero || MOCK_DATA.CLIENTE.genero;
    
    const cotizacion = {
        producto: formData.cotizacionProducto || MOCK_DATA.COTIZACION_BASE.producto,
        id: parseInt(formData.cotizacionId) || MOCK_DATA.COTIZACION_BASE.id,
        periodo_pago_primas: parseInt(formData.periodoPagoPrimas) || MOCK_DATA.COTIZACION_BASE.periodo_pago_primas,
        porcentaje_devolucion: parseFloat(formData.porcentajeDevolucion) || MOCK_DATA.COTIZACION_BASE.porcentaje_devolucion,
        tasa_implicita: parseFloat(formData.tasaImplicita) || MOCK_DATA.COTIZACION_BASE.tasa_implicita,
        devolucion: parseFloat(formData.devolucion) || MOCK_DATA.COTIZACION_BASE.devolucion,
        tabla_devolucion: formData.tablaDevolucion || MOCK_DATA.COTIZACION_BASE.tabla_devolucion,
        parametros: {
            edad_actuarial: edadActuarial,
            sexo: sexo,
            prima: amount
        },
        fecha_creacion: new Date().toISOString(),
        suma_asegurada: parseFloat(formData.sumaAsegurada) || (amount * 100),
        prima_anual: parseFloat(formData.primaAnual) || (amount * 10)
    };
    
    console.log('📋 Payload construido:', {
        cliente,
        cotizacion,
        datosOrigen: formData.clienteDni ? 'URL params' : 'MOCK_DATA (fallback)'
    });
    
    return {
        cliente,
        cotizacion
    };
}

