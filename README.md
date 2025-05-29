# Pulsatrix – Gestión de Personal

**Mini-aplicación full-stack** para la **gestión de empleados**, con:

- 🔐 **Autenticación JWT** y guardas de rutas (login/register/logout + blacklist).
- 🗂️ **CRUD** de personas (crear, listar, editar, eliminar) con paginación básica.
- 📊 **Estadísticas** por departamento y por mes (gráficas Pie y Line en el Dashboard).
- 💻 **Frontend Angular 19** con Tailwind CSS y modales.
- ⚙️ **Backend NestJS** + MongoDB (Mongoose), arquitectura de casos de uso (UseCases).

---

## 📂 Estructura del Proyecto

```
pulsatrix/
├─ backend/
│  ├─ src/
│  │  ├─ auth/
│  │  │  ├─ application/use-cases/
│  │  │  ├─ infrastructure/controllers/
│  │  │  ├─ infrastructure/guards/
│  │  │  ├─ infrastructure/repositories/
│  │  │  └─ infrastructure/strategies/
│  │  ├─ persons/
│  │  │  ├─ application/dto/
│  │  │  ├─ application/use-cases/
│  │  │  ├─ infrastructure/controllers/
│  │  │  ├─ infrastructure/repositories/
│  │  │  └─ infrastructure/schemas/
│  │  ├─ shared/exceptions/
│  │  ├─ app.module.ts
│  │  └─ main.ts
│  ├─ .env
│  └─ package.json
└─ frontend/
   ├─ src/
   │  ├─ app/
   │  │  ├─ modules/
   │  │  │  ├─ auth/
   │  │  │  ├─ persons/
   │  │  │  ├─ dashboard/
   │  │  │  └─ layout/
   │  │  ├─ core/
   │  │  │  └─ service/auth/
   │  │  └─ environments/
   │  └─ tailwind.config.js
   ├─ angular.json
   └─ package.json
```

---

## 🚀 Instalación

### 1. Backend (NestJS + MongoDB)

1. Copia el `.env.example` a `.env` y ajusta:
   ```dotenv
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/pulsatrix
   JWT_SECRET=tu_secreto_jwt
   JWT_EXPIRES_IN=3600s
   ```
2. Instala dependencias y arranca:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
   El servidor escuchará en `http://localhost:3000`.

### 2. Frontend (Angular 19 + Tailwind CSS)

1. Ajusta las APIs en `src/environments/environment.ts`:
   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api/v1/persons',
     apiAuthUrl: 'http://localhost:3000/api/v1/auth'
   };
   ```
2. Instala dependencias y arranca:
   ```bash
   cd frontend
   npm install
   npm run start
   ```
   La app estará en `http://localhost:4200`.

---

## 📑 Endpoints Principales

| Método | Ruta                                       | Descripción                                |
| ------ | ------------------------------------------ | ------------------------------------------ |
| POST   | `/api/v1/auth/register`                    | Registrar usuario                         |
| POST   | `/api/v1/auth/login`                       | Iniciar sesión (devuelve JWT)             |
| POST   | `/api/v1/auth/logout`                      | Logout (revoca token)                     |
| GET    | `/api/v1/persons`                          | Listar personas (paginado: `?page=&limit=`) |
| POST   | `/api/v1/persons`                          | Crear persona                             |
| GET    | `/api/v1/persons/:id`                      | Ver detalle de persona                    |
| PUT    | `/api/v1/persons/:id`                      | Actualizar persona                        |
| DELETE | `/api/v1/persons/:id`                      | Eliminar persona                          |
| GET    | `/api/v1/persons/stats/by-department`      | Estadísticas por departamento             |
| GET    | `/api/v1/persons/stats/by-month`           | Estadísticas de contrataciones por mes    |

---

## 🎨 Frontend Features

- **Login/Register** protegidos; guarda JWT en `localStorage`.
- **Sidebar** responsive: navegación a Dashboard / Personas.
- **CRUD personas** con formularios (Reactive Forms + validaciones).
- **Paginación** con controles “Anterior/Siguiente” y selector de `limit`.
- **Modal “Ver”** detalle de persona.
- **Dashboard** con ApexCharts (Pie + Line) dentro de “cards” Tailwind.

---

## 🛠️ Scripts Útiles

| Comando                         | Descripción                    |
| ------------------------------- | ------------------------------ |
| `npm run start:dev` (backend)   | Levanta servidor Nest en dev   |
| `npm run start` (frontend)      | Levanta servidor Angular       |
| `npm run build` (frontend)      | Genera `dist/` para producción |
| `npm run lint`                  | Linter (TS + CSS)              |

---

