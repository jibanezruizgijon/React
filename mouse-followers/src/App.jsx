import React, { useEffect, useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('Efecto', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main>
      <h3>Proyecto de midudev 3</h3>
      <div style={{
        position: 'absolute',
        top: -20,
        left: -20,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#09f',
        pointerEvents: 'none',
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: 0.8,
      }} />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Activar" : "Desactivar"}
        Seguir puntero</button>
    </main>
  )
}

export default App