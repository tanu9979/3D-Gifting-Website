import { useState, useEffect } from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import api from '../api'

function Cart({ cart, setCart, user }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user])

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await api.getCart(token)
      setCart(data.items || [])
    } catch (err) {
      console.error('Failed to fetch cart:', err.message)
    }
  }

  const updateQuantity = async (item, newQuantity) => {
    if (!user) return
    
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      if (newQuantity === 0) {
        // Remove item from local state immediately
        setCart(cart.filter(cartItem => cartItem !== item))
      } else {
        // Update quantity in local state
        setCart(cart.map(cartItem => 
          cartItem === item ? { ...cartItem, quantity: newQuantity } : cartItem
        ))
      }
      
      // For now, just update local state since backend needs fixing for customized products
      // await api.updateCart(item.product._id, newQuantity, token)
    } catch (err) {
      alert(err.message)
      // Revert changes on error
      fetchCart()
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (item) => {
    if (!user) return
    
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await api.removeFromCart(item._id, token)
      
      // Remove from local state
      setCart(cart.filter(cartItem => cartItem._id !== item._id))
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await api.placeOrder(token)
      setCart([])
      alert('Order placed successfully!')
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Please login to view your cart</h2>
      </div>
    )
  }

  const total = cart.reduce((sum, item) => {
    const price = item.customization?.finalPrice || item.product?.price || item.price || 0
    return sum + (price * item.quantity)
  }, 0)

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Your cart is empty</h2>
        <p style={{ margin: '1rem 0', color: '#666' }}>Add some products to get started!</p>
        <a href="/products" className="btn btn-primary">Continue Shopping</a>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        {cart.map(item => {
          const product = item.product || item
          const isCustomized = item.customization && Object.keys(item.customization).length > 0
          const displayPrice = isCustomized ? item.customization.finalPrice : product.price
          
          return (
            <div key={`${product._id || product.id}-${isCustomized ? JSON.stringify(item.customization) : 'regular'}`} className="cart-item">
              <div>
                <h3>{product.name}</h3>
                {isCustomized && (
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                    <p>Color: {item.customization.color?.name}</p>
                    <p>Material: {item.customization.material?.name}</p>
                    {item.customization.text && <p>Text: "{item.customization.text}"</p>}
                  </div>
                )}
                <p style={{ color: '#666' }}>${displayPrice} each</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem' }}
                    disabled={loading}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem' }}
                    disabled={loading}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <span style={{ fontWeight: '600', minWidth: '4rem' }}>
                  ${(displayPrice * item.quantity).toFixed(2)}
                </span>
                
                <button 
                  onClick={() => removeItem(item)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem', color: '#ef4444' }}
                  disabled={loading}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}
        
        <div className="cart-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
        
        <div style={{ padding: '1rem', borderTop: '1px solid #eee' }}>
          <button 
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart