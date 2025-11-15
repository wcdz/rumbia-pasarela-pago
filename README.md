# RumbIA - Pasarela de Pago 💳

Pasarela de pago moderna para el producto RUMBO de Interseguro.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo para la pasarela
npm run dev:pasarela
```

El servidor se abrirá automáticamente en `http://localhost:5173/`

### Parámetros URL

Puedes pre-cargar datos usando parámetros URL:

```
http://localhost:5173/?amount=250&name=William%20García&email=maria@ejemplo.com
```

**Parámetros disponibles:**
- `amount` - Monto a pagar
- `name` - Nombre del cliente
- `email` - Email del cliente
- `cardNumber` - Número de tarjeta (opcional)
- `expiryDate` - Fecha de vencimiento (opcional)
- `cvv` - CVV (opcional)

## 📁 Estructura del Proyecto

```
rumbia-pasarela-pago/
├── src/                        # ✨ Nueva estructura organizada
│   ├── index.html             # Página principal
│   ├── css/
│   │   └── styles.css        # Estilos
│   ├── js/
│   │   └── main.js          # Script principal
│   ├── services/
│   │   └── paymentService.js # 🔥 Servicio de API
│   ├── utils/
│   │   ├── validators.js     # Validaciones
│   │   ├── formatters.js     # Formateo
│   │   └── urlParams.js      # Parámetros URL
│   ├── config/
│   │   └── api.config.js    # Configuración centralizada
│   └── README.md            # Documentación técnica
│
├── assets/                   # Recursos (imágenes, etc.)
├── index.html               # [Legacy] Redirige a src/
├── script.js                # [Legacy] Usar src/js/main.js
├── styles.css               # [Legacy] Usar src/css/styles.css
├── MIGRATION.md            # 📖 Guía de migración
└── package.json            # Dependencias y scripts
```

## 🎯 Características

### ✅ Arquitectura Modular
- **Separación de responsabilidades**: Servicios, utilidades y configuración separados
- **ES6 Modules**: Código moderno con imports/exports
- **Reutilizable**: Componentes y funciones fáciles de reutilizar

### 🔒 Seguridad
- Validación de tarjetas con **algoritmo de Luhn**
- Validación de fechas de vencimiento
- Validación de CVV
- Headers de seguridad configurados

### 🎨 UI/UX
- Diseño moderno y responsivo
- Animaciones fluidas
- Feedback visual en tiempo real
- Iconos de tarjetas automáticos (Visa, Mastercard, Amex)

### 🔌 Integración API

**Endpoint**: `POST http://localhost:8000/api/v1/rumbia/emision-poliza`

**Características del servicio**:
- ✅ Logging detallado con emojis
- ✅ Timeout configurable (30 segundos)
- ✅ Manejo robusto de errores
- ✅ Configuración centralizada

**Ejemplo de payload**:
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

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev:pasarela    # Servidor de desarrollo para la pasarela
npm run dev             # Servidor de desarrollo para Vue (si usas Vue)

# Build
npm run build:pasarela  # Build de producción para la pasarela
npm run build           # Build de producción para Vue

# Preview
npm run preview         # Preview del build de producción
```

## 🐛 Debug

El servicio incluye logging detallado en la consola del navegador:

- 🚀 Indica cuando se envía la petición
- 📦 Muestra el payload completo
- ✅ Confirma respuesta exitosa
- ❌ Muestra errores detallados
- ⏱️ Alerta si hay timeout

**Para verificar el endpoint**:
1. Abre DevTools (F12)
2. Ve a la pestaña "Console" para ver los logs
3. Ve a la pestaña "Network" para ver la petición HTTP
4. Completa el formulario y haz clic en "Pagar"
5. Busca la petición a `emision-poliza`

## 📝 Configuración

Edita `src/config/api.config.js` para modificar:

```javascript
export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000/api/v1/rumbia',
    ENDPOINTS: {
        EMITIR_POLIZA: '/emision-poliza'
    },
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json'
    }
};
```

## 🔄 Migración

Si estás migrando desde la versión antigua, lee [`MIGRATION.md`](./MIGRATION.md) para más detalles.

## 📚 Documentación

- [Documentación técnica](./src/README.md) - Detalles de la arquitectura
- [Guía de migración](./MIGRATION.md) - Cambios y mejoras
- [Uso](./USO.md) - Guía de uso original

## ⚠️ Troubleshooting

### El endpoint no se ejecuta

1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Revisa la consola del navegador para ver errores
3. Verifica que no haya problemas de CORS

### Error de módulos

Si ves errores relacionados con imports:
1. Asegúrate de usar un servidor de desarrollo (no abrir el HTML directamente)
2. Verifica que el script tenga `type="module"`

### CORS Error

El backend debe incluir estos headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 👨‍💻 Desarrollo

**Stack tecnológico**:
- Vanilla JavaScript (ES6+)
- CSS3 con variables personalizadas
- HTML5 semántico
- Vite (bundler)

**Buenas prácticas implementadas**:
- ✅ Separación de responsabilidades
- ✅ Código modular y reutilizable
- ✅ Naming conventions consistentes
- ✅ Comentarios JSDoc
- ✅ Manejo de errores robusto
- ✅ Validaciones del lado del cliente

## 📄 Licencia

Desarrollado por [@wcdz](https://github.com/wcdz) para RumbIA - Interseguro

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025
