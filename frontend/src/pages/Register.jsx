import { useState } from 'react'
import api from '../api'

function Register({ setCurrentPage }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.register(formData)
      setSuccess('Account created successfully! Please login.')
      setTimeout(() => setCurrentPage('login'), 2000)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
      
      {error && (
        <div style={{ background: '#fee', color: '#c33', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ background: '#efe', color: '#363', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            minLength="6"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Create Account
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <button onClick={() => setCurrentPage('login')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>Sign in</button>
      </p>
    </div>
  )
}

export default Register