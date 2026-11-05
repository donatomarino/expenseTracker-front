# Expense Tracker

Expense Tracker es una aplicación web para registrar y consultar gastos personales. Está desarrollada con React, TypeScript y Vite. Permite a los usuarios crear una cuenta, iniciar sesión y gestionar sus gastos desde un panel responsive.

## Descripción general

La aplicación está pensada como una SPA (Single Page Application) para el seguimiento de gastos. Su flujo principal incluye:

- autenticación de usuarios
- consulta de gastos en un panel
- creación, edición y eliminación de gastos
- búsqueda, filtros y ordenamiento
- resumen de gastos del periodo seleccionado

## Stack tecnológico

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- Bootstrap Icons
- React Icons
- React Toastify

## Funcionalidades principales

- Registro e inicio de sesión con validación de formularios
- Sesión de usuario guardada en `localStorage`
- Panel con el total gastado, número de transacciones y promedio diario
- Creación, edición y eliminación de gastos
- Búsqueda y ordenamiento de gastos
- Filtros por periodo, método de pago e importe
- Navegación entre meses y años, y selección de un rango de fechas
- Listado adaptable a escritorio y móvil con paginación
- Notificaciones de éxito y error

## Arquitectura del proyecto

El proyecto organiza sus componentes y lógica por módulos:

```text
src/
├── App.tsx
├── index.css
├── main.tsx
├── api/
│   └── APIUtils.ts
├── config/
│   ├── axios.config.ts
│   └── constants/
├── context/
│   ├── LoadingContext.tsx
│   └── SpendingContext.tsx
├── modules/
│   ├── common/
│   │   ├── components/
│   │   └── hooks/
│   ├── home/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── login/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   └── register/
│       ├── hooks/
│       ├── pages/
│       └── services/
└── types/
    └── types.d.ts
```

## Rutas principales

- `/login` → inicio de sesión
- `/register` → registro de usuario
- `/` → panel de gastos para usuarios autenticados

Si no hay una sesión activa, la aplicación dirige al usuario a la pantalla de inicio de sesión.

## Flujo de la aplicación

### 1. Autenticación

El usuario puede registrarse e iniciar sesión. Al iniciar sesión correctamente, la aplicación guarda el token y el nombre del usuario en `localStorage`. El token se utiliza para las peticiones protegidas al servicio de gastos.

### 2. Panel de gastos

El panel muestra los gastos y un resumen del periodo seleccionado. Desde el encabezado se puede añadir un gasto o cerrar la sesión.

### 3. Búsqueda y filtros

El listado permite buscar y ordenar gastos, cambiar de página y filtrar por fechas, método de pago e importes mínimos y máximos. Los resultados se vuelven a consultar al cambiar estos criterios.

### 4. Gestión de gastos

Los formularios permiten añadir y editar gastos indicando su descripción, importe, fecha y método de pago. También es posible eliminar un gasto desde el listado.

## Variables de entorno

El frontend se conecta al backend de Expense Tracker. Puedes utilizar el [backend del proyecto](https://github.com/donatomarino/expenseTracker-back_spring) siguiendo las instrucciones de su repositorio.

Si necesitas configurar las direcciones, crea un archivo `.env.local` en la raíz del frontend:

```env
VITE_AUTH_URL=http://localhost:8080
VITE_API_URL=http://localhost:8081
```

Estas son las direcciones locales de ejemplo. Si el backend utiliza otras, reemplázalas por las indicadas en su configuración. Reinicia Vite después de cambiar el archivo.

## Instalación

1. Clona el repositorio y entra en su carpeta:

```bash
git clone https://github.com/donatomarino/expenseTracker-front.git
cd expenseTracker-front
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el backend de Expense Tracker siguiendo las instrucciones de su [repositorio](https://github.com/donatomarino/expenseTracker-back_spring).
4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre en el navegador la dirección que muestra Vite, normalmente:

```text
http://localhost:5173
```

## Endpoints consumidos

La aplicación realiza peticiones al backend para autenticación y gestión de gastos:

- `POST /login`
- `POST /register`
- `GET /spendings`
- `POST /spendings`
- `PUT /spendings/:id`
- `DELETE /spendings/:id`

La consulta de gastos envía los criterios de búsqueda, filtros y paginación como parámetros.

## Notas de desarrollo

- La lógica está separada en los módulos `home`, `login` y `register`.
- `SpendingContext` mantiene el estado compartido relacionado con los gastos.
- `LoadingContext` gestiona los estados de carga y los botones.
- Axios centraliza las peticiones y añade el token a las solicitudes de gastos.
- Bootstrap y CSS proporcionan los estilos responsive.

Para comprobar el proyecto también están disponibles los comandos:

```bash
npm run build
npm run lint
```

## Autor

Donato Marino
