// Formatear número de tarjeta
function formatCardNumber(value) {
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

// Formatear fecha de vencimiento
function formatExpiryDate(value) {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
}

// Validar número de tarjeta (Luhn algorithm)
function isValidCardNumber(cardNumber) {
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

// Validar fecha de vencimiento
function isValidExpiryDate(expiry) {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const today = new Date();
    const expDate = new Date(yearNum, monthNum - 1);
    
    return expDate > today;
}

// Validar CVV
function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para obtener parámetros de URL
function getUrlParams() {
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

// Función para cargar datos desde URL o valores por defecto
function loadFormData() {
    const data = getUrlParams();
    
    // Cargar datos de tarjeta
    document.getElementById('cardNumber').value = formatCardNumber(data.cardNumber);
    document.getElementById('expiryDate').value = data.expiryDate;
    document.getElementById('cvv').value = data.cvv;
    
    // Cargar nombre y email si están disponibles
    if (data.cardName) {
        document.getElementById('cardName').value = data.cardName;
    }
    if (data.email) {
        document.getElementById('email').value = data.email;
    }
    
    // Cargar monto en el input
    const amountInput = document.getElementById('amountInput');
    if (amountInput) {
        amountInput.value = data.amount;
    }
    
    // Actualizar icono de tarjeta
    updateCardIcon(data.cardNumber);
}

// Función para actualizar icono de tarjeta
function updateCardIcon(cardNumber) {
    const cardIcon = document.querySelector('.card-icon');
    const number = cardNumber.replace(/\s/g, '');
    
    if (number.startsWith('4')) {
        cardIcon.className = 'fab fa-cc-visa card-icon';
        cardIcon.style.color = '#1a1f71';
    } else if (number.startsWith('5') || number.startsWith('2')) {
        cardIcon.className = 'fab fa-cc-mastercard card-icon';
        cardIcon.style.color = '#eb001b';
    } else if (number.startsWith('3')) {
        cardIcon.className = 'fab fa-cc-amex card-icon';
        cardIcon.style.color = '#006fcf';
    } else {
        cardIcon.className = 'fas fa-credit-card card-icon';
        cardIcon.style.color = '#666';
    }
}

// Event listeners para formateo en tiempo real
function setupEventListeners() {
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        e.target.value = formatCardNumber(e.target.value);
        
        // Cambiar icono según tipo de tarjeta
        const cardIcon = document.querySelector('.card-icon');
        const number = e.target.value.replace(/\s/g, '');
        
        if (number.startsWith('4')) {
            cardIcon.className = 'fab fa-cc-visa card-icon';
            cardIcon.style.color = '#1a1f71';
        } else if (number.startsWith('5') || number.startsWith('2')) {
            cardIcon.className = 'fab fa-cc-mastercard card-icon';
            cardIcon.style.color = '#eb001b';
        } else if (number.startsWith('3')) {
            cardIcon.className = 'fab fa-cc-amex card-icon';
            cardIcon.style.color = '#006fcf';
        } else {
            cardIcon.className = 'fas fa-credit-card card-icon';
            cardIcon.style.color = '#666';
        }
    });

    document.getElementById('expiryDate').addEventListener('input', function(e) {
        e.target.value = formatExpiryDate(e.target.value);
    });

    document.getElementById('cvv').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    document.getElementById('cardName').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, '');
    });
}

// Validación del formulario
function validateForm() {
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

// Generar ID de transacción único
function generateTransactionId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 15);
    return `TXN-${new Date().getFullYear()}-${timestamp}${random}`.toUpperCase();
}

// Animar pasos de validación
function animateValidationSteps() {
    return new Promise((resolve) => {
        const steps = ['step1', 'step2', 'step3'];
        let currentStep = 0;

        function activateNextStep() {
            if (currentStep > 0) {
                // Marcar el paso anterior como completado
                const prevStep = document.getElementById(steps[currentStep - 1]);
                prevStep.classList.remove('active');
                prevStep.classList.add('completed');
            }

            if (currentStep < steps.length) {
                // Activar el paso actual
                const currentStepEl = document.getElementById(steps[currentStep]);
                currentStepEl.classList.add('active');
                currentStep++;
                
                // Continuar con el siguiente paso después de un delay
                setTimeout(activateNextStep, 800);
            } else {
                // Marcar el último paso como completado
                const lastStep = document.getElementById(steps[steps.length - 1]);
                lastStep.classList.remove('active');
                lastStep.classList.add('completed');
                
                // Resolver la promesa después de completar todos los pasos
                setTimeout(resolve, 500);
            }
        }

        activateNextStep();
    });
}

// Resetear formulario para nuevo pago
function resetForm() {
    // Volver al primer paso
    currentStep = 1;
    document.getElementById('payment-summary').classList.remove('active');
    document.getElementById('payment-form').classList.add('active');
    document.getElementById('loading-screen').classList.remove('active');
    document.getElementById('success-screen').classList.remove('active');
    
    // Limpiar formulario
    document.getElementById('paymentForm').reset();
    
    // Recargar datos desde URL o valores por defecto
    loadFormData();
    
    // Remover clases de error
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('error');
    });

    // Ocultar mensajes de error
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Resetear pasos de validación
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Resetear PIN
    pinFilledCount = 0;
    document.querySelectorAll('.pin-dot').forEach(dot => {
        dot.classList.remove('filled');
    });
    
    // El icono de tarjeta ya se actualiza en loadFormData()
}

// Variables de estado
let currentStep = 1;
let pinFilledCount = 0;

// Navegar al siguiente paso
function goToNextStep() {
    if (currentStep === 1 && !validateForm()) {
        return;
    }
    
    if (currentStep === 1) {
        // Actualizar resumen con los datos del formulario
        updateSummary();
        
        // Cambiar de paso
        document.getElementById('payment-form').classList.remove('active');
        document.getElementById('payment-summary').classList.add('active');
        currentStep = 2;
        
        // Simular llenado de PIN después de 1 segundo
        setTimeout(simulatePinFill, 1000);
    }
}

// Volver al paso anterior
function goToPrevStep() {
    if (currentStep === 2) {
        document.getElementById('payment-summary').classList.remove('active');
        document.getElementById('payment-form').classList.add('active');
        currentStep = 1;
        
        // Resetear PIN
        pinFilledCount = 0;
        document.querySelectorAll('.pin-dot').forEach(dot => {
            dot.classList.remove('filled');
        });
    }
}

// Actualizar resumen con datos del formulario
function updateSummary() {
    const cardName = document.getElementById('cardName').value || 'CLIENTE';
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const email = document.getElementById('email').value;
    const amountInput = document.getElementById('amountInput');
    const amount = amountInput ? parseFloat(amountInput.value).toFixed(2) : '0.00';
    
    // Actualizar nombre
    document.getElementById('summaryCardHolder').textContent = cardName.toUpperCase();
    
    // Actualizar número de tarjeta (últimos 4 dígitos)
    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
    document.getElementById('summaryCardNumber').textContent = `•••• ${lastFour}`;
    
    // Actualizar fecha de expiración
    document.getElementById('summaryCardExpiry').textContent = expiryDate;
    
    // Actualizar email
    document.getElementById('summaryEmail').textContent = email;
    
    // Actualizar monto
    document.getElementById('summaryAmount').textContent = `S/ ${amount}`;
    
    // Actualizar botón de pagar
    const payButton = document.getElementById('payButton');
    if (payButton) {
        payButton.textContent = `Pagar S/ ${amount}`;
    }
}

// Simular llenado de PIN
function simulatePinFill() {
    const interval = setInterval(() => {
        if (pinFilledCount < 4) {
            pinFilledCount++;
            const pinDot = document.querySelector(`.pin-dot[data-pin="${pinFilledCount}"]`);
            if (pinDot) {
                pinDot.classList.add('filled');
            }
        } else {
            clearInterval(interval);
        }
    }, 400);
}

// Configurar eventos del formulario
function setupFormEvents() {
    // Botón continuar
    document.getElementById('continueButton').addEventListener('click', goToNextStep);
    
    // Botón volver
    document.getElementById('backButton').addEventListener('click', goToPrevStep);
    
    // Procesar pago
    document.getElementById('payButton').addEventListener('click', async function() {
        // Ocultar resumen y mostrar pantalla de carga
        document.getElementById('payment-summary').classList.remove('active');
        document.getElementById('loading-screen').classList.add('active');
        
        // Resetear pasos (quitar clases active/completed)
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        // Animar pasos de validación
        await animateValidationSteps();
        
        // Preparar payload mock para el endpoint
        const amountInput = document.getElementById('amountInput');
        const amount = amountInput ? parseFloat(amountInput.value) : 250.0;
        
        const paymentPayload = {
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
        
        try {
            // Enviar petición al endpoint
            const response = await fetch('http://localhost:8000/api/v1/rumbia/emision-poliza', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentPayload)
            });
            
            let transactionId;
            
            if (response.ok) {
                const responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);
                transactionId = responseData.transactionId || responseData.id || generateTransactionId();
            } else {
                console.error('Error en la respuesta:', response.status);
                transactionId = generateTransactionId();
            }
            
            // Delay adicional antes de mostrar el éxito
            setTimeout(() => {
                document.getElementById('transactionId').textContent = transactionId;
                
                // Mostrar pantalla de éxito
                document.getElementById('loading-screen').classList.remove('active');
                document.getElementById('success-screen').classList.add('active');
            }, 800);
            
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            
            // Mostrar éxito de todas formas (modo mock)
            setTimeout(() => {
                const transactionId = generateTransactionId();
                document.getElementById('transactionId').textContent = transactionId;
                
                // Mostrar pantalla de éxito
                document.getElementById('loading-screen').classList.remove('active');
                document.getElementById('success-screen').classList.add('active');
            }, 800);
        }
    });

    // Validación en tiempo real
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', validateForm);
    });
}

// Inicializar aplicación
function initializeApp() {
    loadFormData();
    setupEventListeners();
    setupFormEvents();
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initializeApp);
