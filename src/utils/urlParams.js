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
        cardNumber: params.get('cardNumber') || '4111 1111 1111 1111',
        expiryDate: params.get('expiryDate') || '12/30',
        cvv: params.get('cvv') || '123',
        cardName: params.get('name') || params.get('cardName') || '',
        email: params.get('email') || '',
        amount: params.get('amount') || '150.00'
    };
}

