# Camping App

Aplicacion web fullstack para un camping tipo Airbnb.

## Estructura

- `frontend/`: React + Vite + Tailwind (pendiente de desarrollar)
- `backend/`: Node.js + Express + Prisma + MySQL + JWT

## Backend

### 1. Configurar variables de entorno

Copiar `backend/.env.example` a `backend/.env` y ajustar:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`

### 2. Instalar dependencias

```bash
cd backend
npm install
```

### 3. Generar Prisma y migraciones

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Arrancar el backend

```bash
npm run dev
```

### 5. Crear usuario admin inicial

```bash
npm run prisma:seed
```

### Endpoints principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/accommodations`
- `GET /api/accommodations/:id`
- `POST /api/bookings`
- `GET /api/users/me/bookings`
- `POST /api/admin/accommodations`
- `PUT /api/admin/accommodations/:id`
- `DELETE /api/admin/accommodations/:id`
