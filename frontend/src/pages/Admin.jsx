import { useState } from 'react'
import AdminProducts from '../components/AdminProducts'
import AdminOrders from '../components/AdminOrders'

function Admin({ user }) {
  const [activeTab, setActiveTab] = useState('products')

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Access Denied</h2>
        <p>Admin access required</p>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('products')}
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && <AdminProducts />}
      {activeTab === 'orders' && <AdminOrders />}
    </div>
  )
}

export default Admin