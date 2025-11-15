# Guía de Uso - Configuración de Pago

## 📋 Descripción General

Tu pasarela de pago ahora permite configurar el **monto** (en Soles S/), **nombre del titular** y **correo electrónico** de forma flexible. Los datos de la tarjeta vienen pre-llenados por defecto para testing.

---

## 🎯 Formas de Configuración

### **Opción 1: Editar Directamente en el Formulario** ✏️

Los usuarios pueden editar el monto directamente en la página:

1. El campo de monto es **editable** - simplemente haz clic en él y cambia el valor
2. Los campos de nombre y correo se pueden completar manualmente
3. Los datos de la tarjeta siempre se deben ingresar manualmente (por seguridad)

---

### **Opción 2: Pre-configurar con Parámetros URL** 🔗

Puedes enviar enlaces con los datos pre-llenados usando parámetros en la URL:

#### **Formato de URL:**
```
index.html?amount=250&name=María García&email=maria@ejemplo.com
```

#### **Parámetros disponibles:**

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `amount` | Monto del pago (en soles) | `amount=250` |
| `name` | Nombre del titular | `name=María García` |
| `email` | Correo electrónico | `email=maria@ejemplo.com` |

---

## 💡 Ejemplos de Uso

### **Ejemplo 1: Solo el monto**
```
index.html?amount=500
```
- El monto será S/ 500.00
- Nombre y correo estarán vacíos para que el usuario los complete
- Tarjeta vendrá con datos de prueba por defecto

### **Ejemplo 2: Monto y nombre**
```
index.html?amount=150.50&name=Juan Pérez
```
- El monto será S/ 150.50
- El nombre se pre-llenará con "Juan Pérez"
- El correo estará vacío
- Tarjeta con datos de prueba

### **Ejemplo 3: Todos los datos completos**
```
index.html?amount=89.99&name=Ana López&email=ana.lopez@correo.com
```
- El monto será S/ 89.99
- El nombre se pre-llenará con "Ana López"
- El correo se pre-llenará con "ana.lopez@correo.com"
- Tarjeta con datos de prueba

### **Ejemplo 4: URL con espacios codificados**
Si usas espacios en los nombres, es recomendable codificarlos:
```
index.html?amount=300&name=Pedro%20Martínez&email=pedro@mail.com
```

---

## 🔧 Configuración por Defecto

**Para facilitar el testing:**
- ✅ Los datos de tarjeta vienen **pre-llenados** con una tarjeta de prueba Visa
- ✅ Número: 4111 1111 1111 1111
- ✅ Fecha: 12/30
- ✅ CVV: 123
- ✅ El usuario puede cambiar cualquier valor si lo desea
- ✅ Se pueden configurar por URL: monto, nombre y correo

---

## 🧪 Pruebas

### **Probar localmente:**
1. Abre tu navegador
2. Usa estas URLs de prueba:
   - `file:///ruta/a/tu/index.html?amount=100&name=Test&email=test@mail.com`
   - O simplemente abre `index.html` y edita el monto manualmente

### **URLs de ejemplo para probar:**
```bash
# Monto de S/ 50
index.html?amount=50

# Pago de S/ 250 para María
index.html?amount=250&name=María&email=maria@correo.com

# Pago de S/ 1500.75 para empresa
index.html?amount=1500.75&name=Empresa SA&email=facturacion@empresa.com
```

---

## ⚙️ Valores por Defecto

Si no se proporciona ningún parámetro:
- **Monto:** $150.00 (puede ser editado por el usuario)
- **Nombre:** Campo vacío
- **Correo:** Campo vacío

---

## 📱 Compatibilidad

- ✅ Funciona en todos los navegadores modernos
- ✅ Compatible con dispositivos móviles
- ✅ Responsive design adaptado a todas las pantallas
- ✅ Validación de formularios en tiempo real

---

## 🎨 Características Adicionales

- 🔢 **Validación de monto:** Solo acepta números positivos
- ✉️ **Validación de email:** Verifica formato correcto
- 💳 **Detección automática de tipo de tarjeta:** Visa, Mastercard, Amex
- 🔐 **Cifrado seguro:** SSL/TLS para todas las transacciones
- 📊 **Resumen antes de pagar:** Revisa todos los datos antes de confirmar

---

## 🆘 Soporte

Si tienes dudas o problemas, revisa:
1. Los valores están siendo pasados correctamente en la URL
2. El monto es un número válido (sin símbolos como $ o comas)
3. El email tiene formato válido (con @ y dominio)

---

**Desarrollado por @wcdz**

