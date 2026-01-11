import { useState, useEffect } from 'react'
import { ShoppingCart, Box } from 'lucide-react'
import Product3D from '../components/Product3D'
import api from '../api'

function Products({ cart, setCart, user, setCurrentPage, setSelectedProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError(err.message)
      // Set some mock data for testing
      setProducts([
        {
          _id: '1',
          name: 'Custom Diary',
          price: 25,
          description: 'Personalized diary',
          type: '3d-customizable',
          stock: 10
        },
        {
          _id: '2', 
          name: 'Water Bottle',
          price: 15,
          description: 'Custom water bottle',
          type: '3d-customizable',
          stock: 5
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product) => {
    if (!user) {
      alert('Please login to add items to cart')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await api.addToCart(product._id, 1, token)
      
      // Update local cart state
      const existingItem = cart.find(item => item._id === product._id)
      if (existingItem) {
        setCart(cart.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      } else {
        setCart([...cart, { ...product, quantity: 1 }])
      }
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: '#c33' }}>Error: {error}</div>

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Products</h1>
      
      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>No products available</div>
      ) : (
        <div className="products-grid">
          {products.map(product => {
            console.log('Product:', product.name, 'Type:', product.type, 'Customizable:', product.type === '3d-customizable')
            return (
              <div key={product._id} className="product-card">
              <div className="product-image">
                {product.type === '3d-customizable' && 
                 (product.name.toLowerCase().includes('diary') || 
                  product.name.toLowerCase().includes('book') || 
                  product.name.toLowerCase().includes('bottle')) ? (
                  <div style={{ height: '200px', width: '100%' }}>
                    <Product3D 
                      productType={product.name} 
                      customization={{ color: { hex: '#8B4513' } }} 
                    />
                  </div>
                ) : (
                  <span>Product Image</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <p style={{ fontSize: '0.8rem', color: '#999' }}>Type: {product.type || 'regular'}</p>
                
                {product.type === '3d-customizable' && 
                 (product.name.toLowerCase().includes('diary') || 
                  product.name.toLowerCase().includes('book') || 
                  product.name.toLowerCase().includes('bottle')) ? (
                  <button 
                    onClick={() => {
                      setSelectedProduct(product)
                      setCurrentPage('product-3d')
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Box size={16} />
                    Customize in 3D
                  </button>
                ) : (
                  <button 
                    onClick={() => addToCart(product)}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart size={16} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                )}
              </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Products