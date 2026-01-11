import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import MyOrders from './pages/MyOrders'
import Product3DDetail from './pages/Product3DDetail'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home />
      case 'products': return <Products cart={cart} setCart={setCart} user={user} setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
      case 'product-3d': return <Product3DDetail user={user} cart={cart} setCart={setCart} product={selectedProduct} setCurrentPage={setCurrentPage} />
      case 'login': return <Login setUser={setUser} setCurrentPage={setCurrentPage} />
      case 'register': return <Register setCurrentPage={setCurrentPage} />
      case 'cart': return <Cart cart={cart} setCart={setCart} user={user} />
      case 'admin': return <Admin user={user} />
      case 'my-orders': return <MyOrders user={user} />
      default: return <Home />
    }
  }

  return (
    <div className="app">
      <Header user={user} setUser={setUser} cartCount={cart.length} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App