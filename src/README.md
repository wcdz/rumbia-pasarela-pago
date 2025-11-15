# Pasarela de Pago - RumbIA

## 📁 Estructura del Proyecto

```
src/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos de la aplicación
├── js/
│   └── main.js           # Script principal
├── services/
│   └── paymentService.js # Servicio para API de pagos
└── utils/
    ├── validators.js     # Funciones de validación
    ├── formatters.js     # Funciones de formateo
    └── urlParams.js      # Manejo de parámetros URL
```

## 🚀 Características

- **Arquitectura Modular**: Código organizado por responsabilidades
- **Servicios Separados**: Lógica de API aislada en servicios
- **Validaciones Robustas**: Validación de tarjetas con algoritmo de Luhn
- **ES6 Modules**: Uso de imports/exports modernos
- **API REST**: Integración con endpoint de emisión de pólizas

## 🔧 Uso

### Parámetros URL

La aplicación acepta los siguientes parámetros en la URL:

```
http://localhost:5173/?amount=250&name=William%20García&email=maria@ejemplo.com
```

**Parámetros disponibles:**
- `amount`: Monto a pagar (requerido)
- `name`: Nombre del cliente (opcional)
- `email`: Email del cliente (opcional)
- `cardNumber`: Número de tarjeta pre-llenado (opcional)
- `expiryDate`: Fecha de vencimiento pre-llenada (opcional)
- `cvv`: CVV pre-llenado (opcional)

### Endpoint API

**POST** `http://localhost:8000/api/v1/rumbia/emision-poliza`

**Payload:**
```json
{
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
      "prima": 250.0
    },
    "id": 1,
    "fecha_creacion": "2025-11-14T10:33:58.346871",
    "periodo_pago_primas": 7,
    "porcentaje_devolucion": 1.0596336723618456,
    "tasa_implicita": 0.019046878016032442,
    "suma_asegurada": 25000.0,
    "devolucion": 19073.40610251322,
    "prima_anual": 2500.0,
    "tabla_devolucion": "[60, 70, 70, 70, 70, 113.39]"
  }
}
```

## 📦 Servicios

### paymentService.js

Maneja todas las operaciones relacionadas con el API de pagos:

- `emitirPoliza(paymentData)`: Envía la solicitud de emisión de póliza
- `buildPaymentPayload(formData)`: Construye el payload para el endpoint

### validators.js

Funciones de validación:

- `isValidCardNumber()`: Valida número de tarjeta con algoritmo de Luhn
- `isValidExpiryDate()`: Valida fecha de vencimiento
- `isValidCVV()`: Valida código de seguridad
- `isValidEmail()`: Valida formato de email
- `validateForm()`: Valida todo el formulario

### formatters.js

Funciones de formateo:

- `formatCardNumber()`: Formatea número de tarjeta con espacios
- `formatExpiryDate()`: Formatea fecha MM/AA
- `updateCardIcon()`: Actualiza icono según tipo de tarjeta
- `generateTransactionId()`: Genera ID único de transacción

### urlParams.js

Manejo de parámetros URL:

- `getUrlParams()`: Obtiene y parsea parámetros de la URL

## 🛠️ Desarrollo

El proyecto usa ES6 modules, por lo que necesitas un servidor local:

```bash
# Con Python
python -m http.server 8080

# Con Node.js
npx serve src

# Con Live Server (VS Code)
# Click derecho en index.html > Open with Live Server
```

## 🔒 Seguridad

- Validación de tarjetas con algoritmo de Luhn
- Headers CORS configurados
- Cifrado SSL en producción
- Validación de inputs en tiempo real

## 📝 Notas

- El payload actual usa datos mock que serán reemplazados con datos reales
- La respuesta del endpoint debe incluir `transactionId` o `id`
- En caso de error, se muestra un ID de transacción generado localmente

