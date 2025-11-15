/**
 * Servicio para manejar las operaciones de pago
 */

const API_BASE_URL = 'http://localhost:8000/api/v1/rumbia';

/**
 * Envía la solicitud de emisión de póliza
 * @param {Object} paymentData - Datos del pago
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function emitirPoliza(paymentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/emision-poliza`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('Error al emitir póliza:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Construye el payload para la emisión de póliza
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Payload formateado
 */
export function buildPaymentPayload(formData) {
    const amount = parseFloat(formData.amount) || 250.0;
    
    return {
        "cliente": {
            "dni": "12345678",
            "nombre": "Stef Cornejo",
            "fechaNacimiento": "1990-05-15",
            "genero": "M",
            "telefono": "+51987654321",
            "correo": "wcdz.dev@gmail.com"
        },
        "cotizacion": {
            "producto": "RUMBO",
            "parametros": {
                "edad_actuarial": 35,
                "sexo": "M",
                "prima": amount
            },
            "id": 1,
            "fecha_creacion": new Date().toISOString(),
            "periodo_pago_primas": 7,
            "porcentaje_devolucion": 1.0596336723618456,
            "tasa_implicita": 0.019046878016032442,
            "suma_asegurada": amount * 100,
            "devolucion": 19073.40610251322,
            "prima_anual": amount * 10,
            "tabla_devolucion": "[60, 70, 70, 70, 70, 113.39]"
        }
    };
}

