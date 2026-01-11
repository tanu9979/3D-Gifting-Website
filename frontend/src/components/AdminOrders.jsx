import { useState, useEffect } from 'react'
import api from '../api'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await api.getAllOrders(token)
      setOrders(data)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      await api.updateOrderStatus(orderId, newStatus, token)
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div>Loading orders...</div>

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>All Orders</h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>No orders found</div>
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
                  <p style={{ color: '#666' }}>Customer: {order.user?.name} ({order.user?.email})</p>
                  <p style={{ color: '#666' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Total: ${order.totalPrice}</p>
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      border: '1px solid #ddd',
                      background: order.status === 'delivered' ? '#dcfce7' : order.status === 'processing' ? '#dbeafe' : order.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                      color: order.status === 'delivered' ? '#166534' : order.status === 'processing' ? '#1e40af' : order.status === 'cancelled' ? '#dc2626' : '#92400e'
                    }}
                  >
                    <option value="order placed">Order Placed</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} style={{ 
                    padding: '1rem 0',
                    borderBottom: index < order.items.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600' }}>{item.product?.name || 'Product'}</span>
                      <span>Qty: {item.quantity} × ${item.product?.price || 0}</span>
                    </div>
                    
                    {item.customization && (
                      <div style={{ 
                        background: '#f8f9fa', 
                        padding: '0.75rem', 
                        borderRadius: '4px', 
                        marginTop: '0.5rem',
                        fontSize: '0.9rem'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Customization Details:</h5>
                        
                        {item.customization.color && (
                          <div style={{ marginBottom: '0.25rem' }}>
                            <strong>Color:</strong> {item.customization.color.name} 
                            <span style={{ 
                              display: 'inline-block', 
                              width: '16px', 
                              height: '16px', 
                              backgroundColor: item.customization.color.hex, 
                              marginLeft: '0.5rem',
                              border: '1px solid #ddd',
                              borderRadius: '2px'
                            }}></span>
                            {item.customization.color.price > 0 && ` (+$${item.customization.color.price})`}
                          </div>
                        )}
                        
                        {item.customization.material && (
                          <div style={{ marginBottom: '0.25rem' }}>
                            <strong>Material:</strong> {item.customization.material.name}
                            {item.customization.material.price > 0 && ` (+$${item.customization.material.price})`}
                          </div>
                        )}
                        
                        {item.customization.text && (
                          <div style={{ marginBottom: '0.25rem' }}>
                            <strong>Text Engraving:</strong> "{item.customization.text}"
                            {item.customization.textPrice > 0 && ` (+$${item.customization.textPrice})`}
                          </div>
                        )}
                        
                        {item.customization.totalPrice && (
                          <div style={{ marginTop: '0.5rem', fontWeight: '600', color: '#28a745' }}>
                            <strong>Total Item Price: ${item.customization.totalPrice}</strong>
                          </div>
                        )}
                      </div>
                    )}
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

export default AdminOrders