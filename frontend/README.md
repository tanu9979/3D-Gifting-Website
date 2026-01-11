# ShopEase Frontend

A modern, human-like React ecommerce frontend built with Vite.

## Features

- **Modern Design**: Clean, intuitive interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **User Authentication**: Login and registration with JWT tokens
- **Product Catalog**: Browse products with detailed information
- **Shopping Cart**: Add, remove, and manage cart items
- **Real-time Updates**: Cart count updates instantly

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Lucide React**: Beautiful icons
- **CSS3**: Custom styling with modern features

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   └── Header.jsx          # Navigation header
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Products.jsx       # Product catalog
│   ├── Login.jsx          # User login
│   ├── Register.jsx       # User registration
│   └── Cart.jsx           # Shopping cart
├── App.jsx                # Main app component
├── App.css                # Global styles
└── main.jsx               # App entry point
```

## API Integration

The frontend connects to the backend API at `http://localhost:3001`:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Fetch products
- `POST /api/cart` - Cart operations

## Features Overview

### Authentication
- Secure login/register forms
- JWT token storage
- Protected routes
- User session management

### Product Display
- Grid layout with product cards
- Product images, names, prices, descriptions
- Add to cart functionality
- Category filtering (ready for backend integration)

### Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart state

### User Experience
- Smooth hover effects
- Loading states
- Error handling
- Responsive design
- Intuitive navigation

## Customization

The app uses CSS custom properties for easy theming. Key colors:
- Primary: `#2563eb` (blue)
- Success: `#10b981` (green)
- Error: `#ef4444` (red)
- Background: `#fafafa` (light gray)

## Development Notes

- Uses functional components with hooks
- State management with useState
- Responsive design with CSS Grid/Flexbox
- Modern ES6+ JavaScript
- Clean, readable code structure

## Future Enhancements

- Product search and filtering
- User profiles and order history
- Payment integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard