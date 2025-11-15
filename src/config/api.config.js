/**
 * Configuración de API
 */

export const API_CONFIG = {
    BASE_URL: 'https://rumbia-backend-197831323053.us-central1.run.app/api/v1/rumbia',
    ENDPOINTS: {
        EMITIR_POLIZA: '/emision-poliza'
    },
    TIMEOUT: 30000, // 30 segundos
    HEADERS: {
        'Content-Type': 'application/json'
    }
};

export const MOCK_DATA = {
    CLIENTE: {
        dni: "12345678",
        nombre: "Stef Cornejo",
        fechaNacimiento: "1990-05-15",
        genero: "M",
        telefono: "+51987654321",
        correo: "wcdz.dev@gmail.com"
    },
    COTIZACION_BASE: {
        producto: "RUMBO",
        id: 1,
        periodo_pago_primas: 7,
        porcentaje_devolucion: 1.0596336723618456,
        tasa_implicita: 0.019046878016032442,
        devolucion: 19073.40610251322,
        tabla_devolucion: "[60, 70, 70, 70, 70, 113.39]"
    }
};

