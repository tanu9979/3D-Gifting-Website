const API_BASE_URL = 'https://threed-gifting-website.onrender.com'

const api = {
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Login failed')
    return data
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Registration failed')
    return data
  },

  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/api/products`)
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to fetch products')
    return data
  },

  async addToCart(productId, quantity, token, customization = null) {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity, customization })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to add to cart')
    return data
  },

  async getCart(token) {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to fetch cart')
    return data
  },

  async removeFromCart(itemId, token) {
    const response = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to remove from cart')
    return data
  },

  async updateCart(productId, quantity, token) {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to update cart')
    return data
  },

  async placeOrder(token) {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to place order')
    return data
  },

  async createProduct(productData, token) {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to create product')
    return data
  },

  async updateProduct(id, productData, token) {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to update product')
    return data
  },

  async deleteProduct(id, token) {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to delete product')
    return data
  },

  async getAllOrders(token) {
    const response = await fetch(`${API_BASE_URL}/api/orders/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to fetch orders')
    return data
  },

  async updateOrderStatus(orderId, status, token) {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to update order status')
    return data
  },

  async getUserOrders(token) {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to fetch orders')
    return data
  }
}

export default api
