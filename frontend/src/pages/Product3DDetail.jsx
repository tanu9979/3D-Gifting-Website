import { useState, useEffect } from 'react'
import Product3D from '../components/Product3D'
import CustomizationPanel from '../components/CustomizationPanel'
import api from '../api'

function Product3DDetail({ user, cart, setCart, product, setCurrentPage }) {
  const [customization, setCustomization] = useState({})
  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    if (product) {
      setFinalPrice(product.basePrice || product.price || 0)
    }
  }, [product])

  const addToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart')
      return
    }

    if (!customization.color || !customization.material) {
      alert('Please select color and material')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const customizationData = {
        ...customization,
        finalPrice
      }
      
      await api.addToCart(product._id, 1, token, customizationData)
      alert('Added to cart!')
    } catch (err) {
      alert(err.message)
    }
  }

  if (!product) return <div>No product selected</div>

  const productType = product.name.toLowerCase()

  return (
    <div>
      <button 
        onClick={() => setCurrentPage('products')}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', background: '#f5f5f5', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
      >
        ← Back to Products
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
        {/* 3D Viewer */}
        <div style={{ height: '500px', background: '#f5f5f5', borderRadius: '8px' }}>
          <Product3D 
            productType={productType} 
            customization={customization} 
            modelPath={product.model3D}
          />
        </div>

        {/* Product Info & Customization */}
        <div>
          <h1>{product.name}</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{product.description}</p>
          
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Price: ${finalPrice.toFixed(2)}
          </div>

          <CustomizationPanel 
            product={product}
            customization={customization}
            setCustomization={setCustomization}
            onPriceUpdate={setFinalPrice}
          />

          <button 
            onClick={addToCart}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.1rem' }}
          >
            Add to Cart - ${finalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product3DDetail