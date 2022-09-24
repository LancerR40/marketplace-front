import { useState, useEffect } from 'react'

const useScreen = () => {
  const [screen, setScreen] = useState({ width: window.innerWidth })

  useEffect(() => {
    window.addEventListener('resize', screenWidthListener)

    return () => {
        window.removeEventListener('resize', screenWidthListener)
    }
  }, [screen])

  const screenWidthListener = () => {
    setScreen(state => ({ ...screen, width: window.innerWidth }))
  }

  return screen
}

export default useScreen