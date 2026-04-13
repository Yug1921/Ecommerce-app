# Backend API

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   npm install
3. Run development server:
   npm run dev

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user and get JWT
- `GET /api/auth/me` - Protected route to fetch current user
- `POST /api/payments/mock` - Protected payment mock API
- `POST /api/uploads/product-image` - Protected image upload API (`multipart/form-data`, field `image`)
- `GET /api/health` - Health check

## Notes

- Uploaded files are stored in `backend/uploads/products`.
- User data is stored in `backend/data/users.json`.
- Postman collection is available at `backend/postman/ecommerce-backend.postman_collection.json`.
