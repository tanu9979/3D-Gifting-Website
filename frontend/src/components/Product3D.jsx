import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Suspense } from 'react'

function Product3D({ productType, customization }) {
  console.log('Product3D props:', { productType, customization })

  const renderProduct = () => {
    const color = customization.color?.hex || '#8B4513'
    
    // DIARY - Simple box
    if (productType?.toLowerCase().includes('diary') || productType?.toLowerCase().includes('book')) {
      return (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.5, 0.4, 3.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {customization.text && (
            <Text
              position={[0, 0.25, 0]}
              fontSize={0.3}
              color="gold"
              anchorX="center"
              anchorY="middle"
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {customization.text}
            </Text>
          )}
        </group>
      )
    }
    
    // BOTTLE - Hexagonal cylinder
    if (productType?.toLowerCase().includes('bottle')) {
      return (
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 3.5, 6]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {customization.text && (
            <Text
              position={[0, 0, 0.65]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {customization.text}
            </Text>
          )}
        </group>
      )
    }
    
    // No default - only diary and bottle supported
    return null
  }

  return (
    <Canvas camera={{ position: [4, 4, 6], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      <Suspense fallback={null}>
        {renderProduct()}
      </Suspense>
    </Canvas>
  )
}

export default Product3D