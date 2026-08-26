# Vehicle Rental Backend Starter

## Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Zod validation

## Start
```bash
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux:
```bash
cp .env.example .env
npm run dev
```

Server:
`http://localhost:5000`

Health check:
`GET /api/v1/health`

## Starter APIs
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/auth/me`
- GET `/api/v1/vehicles`
- GET `/api/v1/vehicles/:id`
- POST `/api/v1/vehicles` (Vendor/Admin)
