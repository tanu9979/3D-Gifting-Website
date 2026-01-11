import { useState, useEffect } from 'react'
import api from '../api'

function MyOrders({ user }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await api.getUserOrders(token)
      setOrders(data)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Please login to view your orders</h2>
      </div>
    )
  }

  if (loading) return <div>Loading your orders...</div>

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>No orders found</h2>
          <p style={{ margin: '1rem 0', color: '#666' }}>You haven't placed any orders yet.</p>
          <a href="/products" className="btn btn-primary">Start Shopping</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order._id} style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <p style={{ color: '#666' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Total: ${order.totalPrice}</p>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '4px', 
                    fontSize: '0.9rem',
                    background: 
                      order.status === 'delivered' ? '#dcfce7' : 
                      order.status === 'processing' ? '#dbeafe' :
                      order.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                    color: 
                      order.status === 'delivered' ? '#166534' : 
                      order.status === 'processing' ? '#1e40af' :
                      order.status === 'cancelled' ? '#dc2626' : '#92400e'
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '0.5rem 0',
                    borderBottom: index < order.items.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <span>{item.product?.name || 'Product'}</span>
                    <span>Qty: {item.quantity} × ${item.product?.price || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders