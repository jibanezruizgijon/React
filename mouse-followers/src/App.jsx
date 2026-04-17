import React, { useEffect, useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    console.log('Efecto', { enabled })
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
  }, [enabled])
  return (
    <>
      <h3>Proyecto de midudev 3</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Activar" : "Desactivar"}
        Seguir puntero</button>
    </>
  )
}

export default App