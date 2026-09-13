# Alke-Wallet

Billetera digital desarrollada con HTML, CSS, Bootstrap 4 y JavaScript puro como parte del bootcamp Full Stack Java.

---

## Descripción

Alke-Wallet es una aplicación web frontend que simula el funcionamiento de una billetera digital. Permite iniciar sesión, consultar el saldo, realizar depósitos, enviar dinero a contactos y visualizar el historial de movimientos. Toda la información persiste entre pantallas gracias al uso de `localStorage`.

---

## Estructura del proyecto

```
alke-wallet/
├── login.html          # Pantalla de inicio de sesión
├── menu.html           # Menú principal con saldo actual
├── deposit.html        # Pantalla de depósito
├── sendmoney.html      # Pantalla de envío de dinero
├── transactions.html   # Historial de movimientos
└── styles.css          # Estilos compartidos
```

---

## Cómo ejecutar el proyecto

1. Cloná o descargá el repositorio.
2. Abrí el archivo `login.html` en tu navegador (Chrome o Firefox recomendado).
3. Usá las credenciales de prueba:
   - **Email:** `usuario@wallet.com`
   - **Contraseña:** `1234`

> No requiere servidor ni instalación de dependencias. Funciona directamente en el navegador.

---

## Funcionalidades

### Login (`login.html`)
- Validación de campos vacíos.
- Verificación de credenciales con JavaScript.
- Mensaje de error si las credenciales son incorrectas.
- Redirección automática al menú principal si son correctas.

### Menú principal (`menu.html`)
- Muestra el saldo actual leído desde `localStorage`.
- Botones con mensaje de redirección animado antes de navegar.
- Opción de cerrar sesión.

### Depositar (`deposit.html`)
- Validación de monto (no vacío, mayor a $0).
- Actualiza el saldo en `localStorage`.
- Registra el movimiento en el historial.
- Muestra el nuevo saldo antes de redirigir.

### Enviar dinero (`sendmoney.html`)
- Lista de contactos persistida en `localStorage`.
- Buscador de contactos por nombre o alias.
- Formulario para agregar nuevos contactos con los campos:
  - Nombre y apellido
  - CBU (validado: 22 dígitos numéricos)
  - Alias
  - Nombre del banco
- Validación de saldo suficiente antes de enviar.
- Actualiza el saldo y registra el egreso en el historial.

### Últimos movimientos (`transactions.html`)
- Lista generada dinámicamente desde `localStorage`.
- Muestra tipo, fecha, hora y monto de cada operación.
- Ingresos en verde, egresos en rojo.
- Mensaje especial si no hay movimientos aún.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las pantallas |
| CSS3 | Estilos personalizados |
| Bootstrap 4 | Diseño responsive y componentes UI |
| JavaScript (ES5/ES6) | Lógica, validaciones e interactividad |
| localStorage | Persistencia de datos entre pantallas |

---

## Conceptos de JavaScript aplicados

- **`addEventListener`** — manejo de eventos en botones y formularios.
- **`localStorage`** — almacenamiento de saldo, historial y contactos entre páginas.
- **`JSON.stringify` / `JSON.parse`** — serialización de objetos para guardarlos en localStorage.
- **`setTimeout`** — redirección con delay para mostrar mensajes de feedback.
- **`createElement` / `appendChild`** — generación dinámica de listas en el DOM.
- **Validaciones** — campos vacíos, tipos numéricos, longitud de CBU, saldo suficiente.

---

## Pantallas

| Pantalla | Descripción |
|---|---|
| Login | Acceso con email y contraseña |
| Menú principal | Saldo y navegación central |
| Depositar | Ingreso de fondos a la cuenta |
| Enviar dinero | Transferencia a contactos |
| Últimos movimientos | Historial de operaciones |

---

## Autor

Desarrollado como proyecto práctico del bootcamp **Full Stack Java — Alke**.

---

## Licencia

Este proyecto es de uso educativo y no tiene fines comerciales.