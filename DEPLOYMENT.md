# Deployment Guide

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Setup full-stack ecommerce workspace"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## 2. Deploy Backend (Render or Railway)

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Required Environment Variables:
  - `PORT=5000`
  - `JWT_SECRET=<strong-secret>`
  - `JWT_EXPIRES_IN=1d`
  - `FRONTEND_URL=<your-frontend-domain>`

## 3. Deploy Frontend (Vercel/Netlify)

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `build`

If needed later, add `REACT_APP_API_BASE_URL` in frontend and point your API service to backend URL.

## 4. Postman Testing

- Import collection: `backend/postman/ecommerce-backend.postman_collection.json`
- Set `baseUrl` for local or deployed backend.
- Login and set `token` variable from response, then run protected requests.
