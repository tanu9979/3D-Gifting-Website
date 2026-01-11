import { ShoppingCart, ChevronDown } from 'lucide-react'
import { useState } from 'react'

function Header({ user, setUser, cartCount, setCurrentPage }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setShowDropdown(false)
    setCurrentPage('home')
  }

  return (
    <header className="header">
      <nav className="nav">
        <button onClick={() => setCurrentPage('home')} className="logo" style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', fontWeight: '700', color: '#2563eb'}}>3D-Gifting</button>
        
        <ul className="nav-links">
          <li><button onClick={() => setCurrentPage('home')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontWeight: '500'}}>Home</button></li>
          <li><button onClick={() => setCurrentPage('products')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontWeight: '500'}}>Products</button></li>
          {user?.role === 'admin' && <li><button onClick={() => setCurrentPage('admin')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontWeight: '500'}}>Admin</button></li>}
        </ul>

        <div className="user-actions">
          <button onClick={() => setCurrentPage('cart')} className="cart-icon" style={{background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '0.5rem'}}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <span>Hi, {user.name}</span>
                <ChevronDown size={16} />
              </button>
              
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  minWidth: '150px',
                  zIndex: 1000
                }}>
                  <button 
                    onClick={() => {setCurrentPage('my-orders'); setShowDropdown(false)}}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#333',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    My Orders
                  </button>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#333'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setCurrentPage('login')} className="btn btn-secondary">Login</button>
              <button onClick={() => setCurrentPage('register')} className="btn btn-primary">Sign Up</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header