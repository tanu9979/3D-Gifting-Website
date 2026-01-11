import { useState, useEffect } from 'react'
import { Edit, Plus, Trash2 } from 'lucide-react'
import api from '../api'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: '',
    type: 'regular', basePrice: '', model3D: ''
  })
  const [colors, setColors] = useState([{ name: 'Red', price: '2', hex: '#ff0000' }])
  const [materials, setMaterials] = useState([{ name: 'Standard', price: '0' }])
  const [textEngraving, setTextEngraving] = useState({ enabled: false, pricePerChar: '0.5' })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Fetch error:', err)
      alert(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        type: formData.type
      }

      if (formData.type === '3d-customizable') {
        productData.basePrice = parseFloat(formData.basePrice) || parseFloat(formData.price)
        productData.model3D = formData.model3D
        productData.customizationOptions = {
          colors: colors.map(c => ({
            name: c.name,
            price: parseFloat(c.price) || 0,
            hex: c.hex
          })),
          materials: materials.map(m => ({
            name: m.name,
            price: parseFloat(m.price) || 0
          })),
          textEngraving: {
            enabled: textEngraving.enabled,
            pricePerChar: parseFloat(textEngraving.pricePerChar) || 0
          }
        }
      }

      console.log('Sending product data:', productData)

      if (editingProduct) {
        await api.updateProduct(editingProduct._id, productData, token)
      } else {
        await api.createProduct(productData, token)
      }

      resetForm()
      fetchProducts()
      alert('Product saved successfully!')
    } catch (err) {
      console.error('Submit error:', err)
      alert(err.message)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '', description: '', price: '', category: '', stock: '',
      type: 'regular', basePrice: '', model3D: ''
    })
    setColors([{ name: 'Red', price: '2', hex: '#ff0000' }])
    setMaterials([{ name: 'Standard', price: '0' }])
    setTextEngraving({ enabled: false, pricePerChar: '0.5' })
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleEdit = (product) => {
    console.log('Editing product:', product)
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      type: product.type || 'regular',
      basePrice: product.basePrice?.toString() || product.price.toString(),
      model3D: product.model3D || ''
    })
    
    if (product.customizationOptions) {
      setColors(product.customizationOptions.colors || [{ name: 'Red', price: '2', hex: '#ff0000' }])
      setMaterials(product.customizationOptions.materials || [{ name: 'Standard', price: '0' }])
      setTextEngraving(product.customizationOptions.textEngraving || { enabled: false, pricePerChar: '0.5' })
    }
    
    setShowForm(true)
  }

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const token = localStorage.getItem('token')
        await api.deleteProduct(product._id, token)
        fetchProducts()
        alert('Product deleted successfully!')
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Products</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <Plus size={16} style={{ marginRight: '0.5rem' }} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="regular">Regular Product</option>
              <option value="3d-customizable">3D Customizable</option>
            </select>

            {formData.type === '3d-customizable' && (
              <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0', borderRadius: '4px' }}>
                <h4>3D Customization Options</h4>
                
                <input
                  type="number"
                  step="0.01"
                  placeholder="Base Price"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                
                <input
                  type="text"
                  placeholder="3D Model File (e.g., diary.glb)"
                  value={formData.model3D}
                  onChange={(e) => setFormData({...formData, model3D: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <div style={{ margin: '1rem 0' }}>
                  <h5>Colors</h5>
                  {colors.map((color, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
                      <input
                        type="text"
                        placeholder="Color Name"
                        value={color.name}
                        onChange={(e) => {
                          const newColors = [...colors]
                          newColors[index].name = e.target.value
                          setColors(newColors)
                        }}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={color.price}
                        onChange={(e) => {
                          const newColors = [...colors]
                          newColors[index].price = e.target.value
                          setColors(newColors)
                        }}
                        style={{ width: '80px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => {
                          const newColors = [...colors]
                          newColors[index].hex = e.target.value
                          setColors(newColors)
                        }}
                        style={{ width: '50px', padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => setColors([...colors, { name: '', price: '', hex: '#000000' }])}
                    className="btn btn-secondary"
                    style={{ marginTop: '0.5rem' }}
                  >
                    Add Color
                  </button>
                </div>

                <div style={{ margin: '1rem 0' }}>
                  <h5>Materials</h5>
                  {materials.map((material, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
                      <input
                        type="text"
                        placeholder="Material Name"
                        value={material.name}
                        onChange={(e) => {
                          const newMaterials = [...materials]
                          newMaterials[index].name = e.target.value
                          setMaterials(newMaterials)
                        }}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={material.price}
                        onChange={(e) => {
                          const newMaterials = [...materials]
                          newMaterials[index].price = e.target.value
                          setMaterials(newMaterials)
                        }}
                        style={{ width: '80px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => setMaterials([...materials, { name: '', price: '' }])}
                    className="btn btn-secondary"
                    style={{ marginTop: '0.5rem' }}
                  >
                    Add Material
                  </button>
                </div>

                <div style={{ margin: '1rem 0' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={textEngraving.enabled}
                      onChange={(e) => setTextEngraving({...textEngraving, enabled: e.target.checked})}
                    />
                    Enable Text Engraving
                  </label>
                  {textEngraving.enabled && (
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price per Character"
                      value={textEngraving.pricePerChar}
                      onChange={(e) => setTextEngraving({...textEngraving, pricePerChar: e.target.value})}
                      style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  )}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Update' : 'Create'} Product
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <span>Product Image</span>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-description">{product.description}</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Stock: {product.stock}</p>
              {product.type === '3d-customizable' && (
                <p style={{ color: '#2563eb', fontSize: '0.9rem' }}>3D Customizable</p>
              )}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    console.log('Edit clicked for:', product.name)
                    handleEdit(product)
                  }}
                  className="btn btn-secondary"
                  style={{ 
                    flex: 1,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    background: '#f5f5f5',
                    padding: '0.75rem'
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete(product)
                  }}
                  className="btn btn-danger"
                  style={{ 
                    flex: 1,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    border: '1px solid #dc3545',
                    background: '#dc3545',
                    color: 'white',
                    padding: '0.75rem'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProducts