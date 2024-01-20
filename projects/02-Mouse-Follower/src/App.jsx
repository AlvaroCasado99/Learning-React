import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  // Debe actualizar la posicion del circulo SOLO si está ENABLE true
  useEffect(()=>{
    console.log('Estado cambiado a: ', enable)

    const handleMove = (event) => {
      const {clientX, clientY} = event;
      setPosition({x: clientX, y: clientY})
      console.log(`Mouse @ (${clientX}, ${clientY})`)
    }

    if (enable){
      window.addEventListener('pointermove', handleMove)
    }
    
    /** 
     Esto es llama CLEAN METHOD y sirve para limpiar el useEffect de suscripciones (a eventos).
     Se ejecuta:
        - ANTES de que se ejecute de nuevo, es decir cuando cambian las dependencias antes de 
          realizar la lógica interna se hace el CLEAN UP
        - Cuando se desmonta el componente
     En ese caso limpia el useEffect de la suscripción al evento 'pointermove'.
    */
    return () => {
      window.removeEventListener('pointermove', handleMove);      
    }
  }, [enable])


  const handleClick = () => {
    setEnable(!enable);
  }

  return (
    <main>
      <div style={{
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #fff',
    borderRadius: '50%',
    opacity: 0.8,
    pointerEvents: 'none',
    left: -25,
    top: -25,
    width: 50,
    height: 50,
    transform: `translate(${position.x}px, ${position.y}px)`
  }}>

      </div>

      <button onClick={handleClick}>
        {(enable) ? 'Desactivar' : 'Activar'} seguimiento del Mouse
      </button>
    </main>
  )
}

export default App
