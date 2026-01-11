import { useState } from 'react'
import api from '../api'

function Login({ setUser, setCurrentPage }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.login(formData)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      setCurrentPage('home')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
      
      {error && (
        <div style={{ background: '#fee', color: '#c33', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Sign In
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <button onClick={() => setCurrentPage('register')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>Sign up</button>
      </p>
    </div>
  )
}

export default Login