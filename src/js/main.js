/**
 * Script principal de la pasarela de pago
 */

import { emitirPoliza, buildPaymentPayload } from '../services/paymentService.js';
import { validateForm } from '../utils/validators.js';
import { 
    formatCardNumber, 
    formatExpiryDate, 
    updateCardIcon, 
    generateTransactionId 
} from '../utils/formatters.js';
import { getUrlParams } from '../utils/urlParams.js';

// Variables de estado
let currentStep = 1;
let pinFilledCount = 0;

/**
 * Cargar datos desde URL o valores por defecto
 */
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
    const cardIcon = document.querySelector('.card-icon');
    updateCardIcon(data.cardNumber, cardIcon);
}

/**
 * Configurar event listeners para formateo en tiempo real
 */
function setupEventListeners() {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardIcon = document.querySelector('.card-icon');
    
    cardNumberInput.addEventListener('input', function(e) {
        e.target.value = formatCardNumber(e.target.value);
        updateCardIcon(e.target.value, cardIcon);
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

/**
 * Navegar al siguiente paso
 */
function goToNextStep() {
    if (currentStep === 1 && !validateForm()) {
        return;
    }
    
    if (currentStep === 1) {
        updateSummary();
        document.getElementById('payment-form').classList.remove('active');
        document.getElementById('payment-summary').classList.add('active');
        currentStep = 2;
        
        // Simular llenado de PIN después de 1 segundo
        setTimeout(simulatePinFill, 1000);
    }
}

/**
 * Volver al paso anterior
 */
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

/**
 * Actualizar resumen con datos del formulario
 */
function updateSummary() {
    const cardName = document.getElementById('cardName').value || 'CLIENTE';
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const email = document.getElementById('email').value;
    const amountInput = document.getElementById('amountInput');
    const amount = amountInput ? parseFloat(amountInput.value).toFixed(2) : '0.00';
    
    document.getElementById('summaryCardHolder').textContent = cardName.toUpperCase();
    
    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
    document.getElementById('summaryCardNumber').textContent = `•••• ${lastFour}`;
    document.getElementById('summaryCardExpiry').textContent = expiryDate;
    document.getElementById('summaryEmail').textContent = email;
    document.getElementById('summaryAmount').textContent = `S/ ${amount}`;
    
    const payButton = document.getElementById('payButton');
    if (payButton) {
        payButton.textContent = `Pagar S/ ${amount}`;
    }
}

/**
 * Simular llenado de PIN
 */
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

/**
 * Animar pasos de validación
 */
function animateValidationSteps() {
    return new Promise((resolve) => {
        const steps = ['step1', 'step2', 'step3'];
        let currentStepIndex = 0;

        function activateNextStep() {
            if (currentStepIndex > 0) {
                const prevStep = document.getElementById(steps[currentStepIndex - 1]);
                prevStep.classList.remove('active');
                prevStep.classList.add('completed');
            }

            if (currentStepIndex < steps.length) {
                const currentStepEl = document.getElementById(steps[currentStepIndex]);
                currentStepEl.classList.add('active');
                currentStepIndex++;
                setTimeout(activateNextStep, 800);
            } else {
                const lastStep = document.getElementById(steps[steps.length - 1]);
                lastStep.classList.remove('active');
                lastStep.classList.add('completed');
                setTimeout(resolve, 500);
            }
        }

        activateNextStep();
    });
}

/**
 * Procesar pago y enviar al endpoint
 */
async function processPayment() {
    // Ocultar resumen y mostrar pantalla de carga
    document.getElementById('payment-summary').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');
    
    // Resetear pasos
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Preparar datos para el payload
    const amountInput = document.getElementById('amountInput');
    const formData = {
        amount: amountInput ? amountInput.value : '250.00'
    };
    
    // Construir payload
    const payload = buildPaymentPayload(formData);
    
    // 🔥 Enviar POST al backend en segundo plano (no esperar respuesta)
    emitirPoliza(payload).then(result => {
        if (result.success) {
            console.log('✅ Backend respondió exitosamente:', result.data);
        } else {
            console.warn('⚠️ Backend no respondió o hubo error:', result.error);
        }
    }).catch(error => {
        console.error('❌ Error inesperado del backend:', error);
    });
    
    // Generar ID de transacción inmediatamente (sin esperar backend)
    const transactionId = generateTransactionId();
    
    // Animar pasos de validación (continuar sin esperar backend)
    await animateValidationSteps();
    
    // Mostrar pantalla de éxito inmediatamente después de la animación
    setTimeout(() => {
        document.getElementById('transactionId').textContent = transactionId;
        document.getElementById('loading-screen').classList.remove('active');
        document.getElementById('success-screen').classList.add('active');
    }, 800);
}

/**
 * Resetear formulario para nuevo pago
 */
function resetForm() {
    currentStep = 1;
    document.getElementById('payment-summary').classList.remove('active');
    document.getElementById('payment-form').classList.add('active');
    document.getElementById('loading-screen').classList.remove('active');
    document.getElementById('success-screen').classList.remove('active');
    
    document.getElementById('paymentForm').reset();
    loadFormData();
    
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('error');
    });

    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    pinFilledCount = 0;
    document.querySelectorAll('.pin-dot').forEach(dot => {
        dot.classList.remove('filled');
    });
}

/**
 * Configurar eventos del formulario
 */
function setupFormEvents() {
    document.getElementById('continueButton').addEventListener('click', goToNextStep);
    document.getElementById('backButton').addEventListener('click', goToPrevStep);
    document.getElementById('payButton').addEventListener('click', processPayment);

    // Validación en tiempo real
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', validateForm);
    });
}

/**
 * Inicializar aplicación
 */
function initializeApp() {
    loadFormData();
    setupEventListeners();
    setupFormEvents();
}

// Hacer resetForm global para el onclick del HTML
window.resetForm = resetForm;

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initializeApp);

