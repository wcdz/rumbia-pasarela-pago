# Guía de Migración - Reestructuración del Proyecto

## 📋 Cambios Realizados

### Antes
```
.
├── index.html
├── script.js
└── styles.css
```

### Después
```
src/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos
├── js/
│   └── main.js           # Script principal (antes script.js)
├── services/
│   └── paymentService.js # Servicio de API (NUEVO)
├── utils/
│   ├── validators.js     # Validaciones (NUEVO)
│   ├── formatters.js     # Formateo (NUEVO)
│   └── urlParams.js      # Parámetros URL (NUEVO)
└── config/
    └── api.config.js     # Configuración (NUEVO)
```

## 🎯 Beneficios de la Reestructuración

1. **Separación de Responsabilidades**: Cada módulo tiene una responsabilidad clara
2. **Mantenibilidad**: Más fácil encontrar y modificar código
3. **Reutilización**: Los servicios y utilidades son reutilizables
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Testing**: Más sencillo escribir pruebas unitarias
6. **Configuración Centralizada**: Un solo lugar para configurar el API

## 📦 Módulos Creados

### 1. `services/paymentService.js`
**Responsabilidad**: Comunicación con el API de pagos

**Funciones exportadas**:
- `emitirPoliza(paymentData)` - Envía POST al endpoint
- `buildPaymentPayload(formData)` - Construye el payload

**Mejoras**:
- ✅ Logging detallado con emojis para debug
- ✅ Timeout configurable (30 segundos)
- ✅ Manejo de errores robusto
- ✅ Usa configuración centralizada

### 2. `utils/validators.js`
**Responsabilidad**: Validación de datos del formulario

**Funciones exportadas**:
- `isValidCardNumber()` - Algoritmo de Luhn
- `isValidExpiryDate()` - Valida fecha MM/AA
- `isValidCVV()` - Valida 3-4 dígitos
- `isValidEmail()` - Valida formato email
- `validateForm()` - Valida formulario completo

### 3. `utils/formatters.js`
**Responsabilidad**: Formateo de datos

**Funciones exportadas**:
- `formatCardNumber()` - Espacios cada 4 dígitos
- `formatExpiryDate()` - Formato MM/AA
- `updateCardIcon()` - Detecta tipo de tarjeta
- `generateTransactionId()` - ID único

### 4. `utils/urlParams.js`
**Responsabilidad**: Manejo de parámetros URL

**Funciones exportadas**:
- `getUrlParams()` - Extrae parámetros de la URL

### 5. `config/api.config.js`
**Responsabilidad**: Configuración centralizada

**Exporta**:
- `API_CONFIG` - URLs, endpoints, headers, timeout
- `MOCK_DATA` - Datos mock para desarrollo

## 🔧 Cambios en el Código

### Endpoint API (Ya configurado correctamente)

**URL**: `http://localhost:8000/api/v1/rumbia/emision-poliza`

**Método**: `POST`

**Headers**:
```javascript
{
  'Content-Type': 'application/json'
}
```

**Payload de ejemplo**:
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

## 🚀 Cómo Usar

### Desarrollo Local

1. **Navegar a la carpeta src**:
   ```bash
   cd src
   ```

2. **Iniciar servidor local**:
   
   Opción A - Con Python:
   ```bash
   python -m http.server 8080
   ```
   
   Opción B - Con Node.js:
   ```bash
   npx serve
   ```
   
   Opción C - VS Code Live Server:
   - Click derecho en `src/index.html`
   - Seleccionar "Open with Live Server"

3. **Abrir en el navegador**:
   ```
   http://localhost:8080/?amount=250&name=William%20García&email=maria@ejemplo.com
   ```

### Debug del Endpoint

El servicio ahora incluye logging detallado en la consola:

- 🚀 Indica cuando se envía la petición
- 📦 Muestra el payload completo
- ✅ Confirma respuesta exitosa
- ❌ Muestra errores detallados
- ⏱️ Alerta si hay timeout

**Para verificar que el endpoint se está llamando**:
1. Abre las DevTools (F12)
2. Ve a la pestaña "Console"
3. Ve a la pestaña "Network"
4. Llena el formulario y haz clic en "Pagar"
5. Busca la petición a `emision-poliza`

## 🐛 Troubleshooting

### El endpoint no se ejecuta

**Síntomas**: No ves la petición en Network tab

**Soluciones**:
1. Verifica que el servidor de desarrollo esté corriendo
2. Asegúrate de usar `type="module"` en el script tag
3. Verifica la consola para errores de CORS
4. Confirma que el backend esté corriendo en `localhost:8000`

### Error CORS

**Síntomas**: Error "CORS policy" en consola

**Solución**: El backend debe incluir estos headers:
```python
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Módulos no se cargan

**Síntomas**: Error "Cannot use import statement outside a module"

**Solución**: Verifica que el HTML tenga:
```html
<script type="module" src="./js/main.js"></script>
```

## 📝 Próximos Pasos

1. **Reemplazar datos mock** en `src/config/api.config.js`
2. **Agregar variables de entorno** para diferentes ambientes
3. **Implementar manejo de errores en UI** (mostrar mensajes al usuario)
4. **Agregar tests unitarios** para servicios y validadores
5. **Configurar bundler** (Vite, Webpack) para producción

## 🔄 Mantener Compatibilidad

Los archivos antiguos (`index.html`, `script.js`, `styles.css`) en la raíz se mantienen por compatibilidad pero deberían eliminarse una vez confirmado que todo funciona correctamente.

