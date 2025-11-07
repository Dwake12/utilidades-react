import {useEffect, useState} from 'react'
import './App.css'

//Nota: ❌ No se puede NUNCA colocar un HOOK (useEffect, useState...) dentro de una condicional o un ciclo

function App() {
  const [enable, setEnable] = useState(false) 
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMouseMove = (event) => {
      const {clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }
    
    console.log('enable: ', enable)
    if (enable) {
       window.addEventListener('mousemove', handleMouseMove)
    }
    // 📌 Importante: siempre se debe colocar al final la desuscripcion del evento, para de esta forma no acomular suscripciones de un mismo evento.
    // Se ejecuta cuando las dependencias cambian, incluso antes de ejecutar el efecto de nuevo
    console.log('cleanup')
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  },[enable])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      
      />
      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Desactivado' : 'Activado'} efecto
      </button>
    </main>
  )
}

export default App
