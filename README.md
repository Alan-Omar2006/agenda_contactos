# Agenda de Contactos

Proyecto simple para presentar el combo: React + Vite + Express + PostgreSQL.

## Ejecutar localmente

### 1. Base de datos
Crea una base de datos PostgreSQL y ejecuta `backend/schema.sql`.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Subir a la nube
- Frontend: Netlify o Vercel.
- Backend: Render.
- Base de datos: Supabase o Neon.

Variables importantes:
- Backend: `DATABASE_URL`, `FRONTEND_URL`.
- Frontend: `VITE_API_URL`.
