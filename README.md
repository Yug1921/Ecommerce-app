# Ecommerce App Workspace

This workspace is split into:

- `frontend` - React app
- `backend` - Node.js/Express API

## Run in Development

From the workspace root:

1. Install root tools:
   - `npm install`
2. Install backend dependencies:
   - `npm install --prefix backend`
3. Start both frontend and backend together:
   - `npm run dev`

## Individual Commands

- Frontend only: `npm run dev:frontend`
- Backend only: `npm run dev:backend`

## Backend Features Implemented

- JWT Authentication (`register`, `login`, protected `me` route)
- Payment mock API with success/failure responses
- Product image upload using Multer
- Input validation with proper error messages
- Postman collection for API testing

## Deployment Suggestion

- Frontend: Vercel or Netlify
- Backend: Render or Railway

Before deployment, set backend environment variables from `backend/.env.example`.
