/**
 * Funciones de formateo para el formulario de pago
 */

/**
 * Formatear número de tarjeta (agregar espacios cada 4 dígitos)
 * @param {string} value - Número de tarjeta sin formato
 * @returns {string} Número formateado
 */
export function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
        return parts.join(' ');
    } else {
        return v;
    }
}

/**
 * Formatear fecha de vencimiento (formato MM/AA)
 * @param {string} value - Fecha sin formato
 * @returns {string} Fecha formateada
 */
export function formatExpiryDate(value) {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
}

/**
 * Detectar tipo de tarjeta y actualizar icono
 * @param {string} cardNumber - Número de tarjeta
 * @param {HTMLElement} iconElement - Elemento del icono
 */
export function updateCardIcon(cardNumber, iconElement) {
    if (!iconElement) return;
    
    const number = cardNumber.replace(/\s/g, '');
    
    if (number.startsWith('4')) {
        iconElement.className = 'fab fa-cc-visa card-icon';
        iconElement.style.color = '#1a1f71';
    } else if (number.startsWith('5') || number.startsWith('2')) {
        iconElement.className = 'fab fa-cc-mastercard card-icon';
        iconElement.style.color = '#eb001b';
    } else if (number.startsWith('3')) {
        iconElement.className = 'fab fa-cc-amex card-icon';
        iconElement.style.color = '#006fcf';
    } else {
        iconElement.className = 'fas fa-credit-card card-icon';
        iconElement.style.color = '#666';
    }
}

/**
 * Generar ID de transacción único
 * @returns {string} ID de transacción
 */
export function generateTransactionId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 15);
    return `TXN-${new Date().getFullYear()}-${timestamp}${random}`.toUpperCase();
}

