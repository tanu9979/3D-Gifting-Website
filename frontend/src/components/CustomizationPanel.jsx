import { useState } from 'react'

function CustomizationPanel({ product, customization, setCustomization, onPriceUpdate }) {
  const [text, setText] = useState('')

  const handleColorChange = (color) => {
    const newCustomization = { ...customization, color }
    setCustomization(newCustomization)
    calculatePrice(newCustomization)
  }

  const handleMaterialChange = (material) => {
    const newCustomization = { ...customization, material }
    setCustomization(newCustomization)
    calculatePrice(newCustomization)
  }

  const handleTextChange = (newText) => {
    setText(newText)
    const newCustomization = { ...customization, text: newText }
    setCustomization(newCustomization)
    calculatePrice(newCustomization)
  }

  const calculatePrice = (custom) => {
    let totalPrice = product.basePrice || product.price
    
    if (custom.color && custom.color.price) totalPrice += parseFloat(custom.color.price)
    if (custom.material && custom.material.price) totalPrice += parseFloat(custom.material.price)
    if (custom.text && product.customizationOptions?.textEngraving?.enabled) {
      totalPrice += custom.text.length * parseFloat(product.customizationOptions.textEngraving.pricePerChar)
    }
    
    onPriceUpdate(totalPrice)
  }

  if (product.type !== '3d-customizable') {
    return null
  }

  return (
    <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3>Customize Your Product</h3>
      
      {/* Colors */}
      <div style={{ marginBottom: '1rem' }}>
        <h4>Colors</h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {product.customizationOptions?.colors?.map(color => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: color.hex,
                border: customization.color?.name === color.name ? '3px solid #000' : '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              title={`${color.name} (+$${color.price})`}
            />
          ))}
        </div>
        {customization.color && (
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            {customization.color.name} (+${customization.color.price})
          </p>
        )}
      </div>

      {/* Materials */}
      <div style={{ marginBottom: '1rem' }}>
        <h4>Materials</h4>
        <select 
          value={customization.material?.name || ''}
          onChange={(e) => {
            const material = product.customizationOptions.materials.find(m => m.name === e.target.value)
            if (material) handleMaterialChange(material)
          }}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Material</option>
          {product.customizationOptions?.materials?.map(material => (
            <option key={material.name} value={material.name}>
              {material.name} {material.price > 0 && `(+$${material.price})`}
            </option>
          ))}
        </select>
      </div>

      {/* Text Engraving */}
      {product.customizationOptions?.textEngraving?.enabled && (
        <div style={{ marginBottom: '1rem' }}>
          <h4>Text Engraving</h4>
          <input
            type="text"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your text"
            maxLength="20"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            ${product.customizationOptions.textEngraving.pricePerChar} per character
            {text && ` (${text.length} chars = $${(text.length * product.customizationOptions.textEngraving.pricePerChar).toFixed(2)})`}
          </p>
        </div>
      )}
    </div>
  )
}

export default CustomizationPanel