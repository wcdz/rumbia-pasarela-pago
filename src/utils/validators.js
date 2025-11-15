/**
 * Funciones de validación para el formulario de pago
 */

/**
 * Validar número de tarjeta usando el algoritmo de Luhn
 * @param {string} cardNumber - Número de tarjeta
 * @returns {boolean} True si es válido
 */
export function isValidCardNumber(cardNumber) {
    const num = cardNumber.replace(/\s/g, '');
    if (num.length < 13 || num.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num.charAt(i), 10);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

/**
 * Validar fecha de vencimiento
 * @param {string} expiry - Fecha en formato MM/AA
 * @returns {boolean} True si es válida
 */
export function isValidExpiryDate(expiry) {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const today = new Date();
    const expDate = new Date(yearNum, monthNum - 1);
    
    return expDate > today;
}

/**
 * Validar CVV
 * @param {string} cvv - Código de seguridad
 * @returns {boolean} True si es válido
 */
export function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

/**
 * Validar email
 * @param {string} email - Correo electrónico
 * @returns {boolean} True si es válido
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validar todo el formulario
 * @returns {boolean} True si todos los campos son válidos
 */
export function validateForm() {
    let isValid = true;
    
    // Validar monto
    const amountInput = document.getElementById('amountInput');
    if (amountInput) {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            amountInput.classList.add('error');
            isValid = false;
        } else {
            amountInput.classList.remove('error');
        }
    }
    
    // Validar número de tarjeta
    const cardNumber = document.getElementById('cardNumber').value;
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNumberError = document.getElementById('cardNumberError');
    
    if (!isValidCardNumber(cardNumber)) {
        cardNumberInput.classList.add('error');
        cardNumberError.style.display = 'block';
        isValid = false;
    } else {
        cardNumberInput.classList.remove('error');
        cardNumberError.style.display = 'none';
    }
    
    // Validar fecha de vencimiento
    const expiryDate = document.getElementById('expiryDate').value;
    const expiryInput = document.getElementById('expiryDate');
    const expiryError = document.getElementById('expiryError');
    
    if (!isValidExpiryDate(expiryDate)) {
        expiryInput.classList.add('error');
        expiryError.style.display = 'block';
        isValid = false;
    } else {
        expiryInput.classList.remove('error');
        expiryError.style.display = 'none';
    }
    
    // Validar CVV
    const cvv = document.getElementById('cvv').value;
    const cvvInput = document.getElementById('cvv');
    const cvvError = document.getElementById('cvvError');
    
    if (!isValidCVV(cvv)) {
        cvvInput.classList.add('error');
        cvvError.style.display = 'block';
        isValid = false;
    } else {
        cvvInput.classList.remove('error');
        cvvError.style.display = 'none';
    }
    
    // Validar nombre
    const cardName = document.getElementById('cardName').value;
    const nameInput = document.getElementById('cardName');
    const nameError = document.getElementById('nameError');
    
    if (cardName.length < 2) {
        nameInput.classList.add('error');
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameInput.classList.remove('error');
        nameError.style.display = 'none';
    }
    
    // Validar email
    const email = document.getElementById('email').value;
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!isValidEmail(email)) {
        emailInput.classList.add('error');
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
    }
    
    return isValid;
}

