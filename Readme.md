# 3D Gifting Website

A full-stack e-commerce platform for 3D customizable gifts with interactive product visualization.

## Features

- 3D product visualization and customization
- User authentication (login/register)
- Shopping cart and order management
- Admin panel for product and order management
- Responsive design

## Tech Stack

**Frontend:**
- React + Vite
- Three.js for 3D rendering
- CSS3

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- CORS enabled

## Live Demo

- **Frontend:** https://3-d-gifting-website.vercel.app/
- **Backend:** https://threed-gifting-website.onrender.com

## Setup

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` in backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

## Admin Credentials

- **Email:** admin@3dgifting.com
- **Password:** admin123

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/products` - Get all products
- `POST /api/cart` - Add to cart
- `GET /api/orders` - Get user orders

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── api.js
    └── package.json
```
