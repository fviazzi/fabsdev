// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import toggleAnimation from './toggle.json'
import { AppContext } from 'Context'

export default function Toggle () {

  // Global state
  const { state } = React.useContext(AppContext)

  const [mounted, setMounted] = React.useState(false)
  const [loaded, setLoaded]   = React.useState(false)

  // Constants
  const lottieRef = React.useRef(null)

  // Mount effect
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Mount effect
  React.useEffect(() => {

    lottieRef.current.setSpeed(2)
    lottieRef.current.stop()

    if (state.theme === 'dark-theme') {
      lottieRef.current.setDirection(1)
      lottieRef.current.play()
    }

  }, [loaded])

  // Toggle effect
  React.useEffect(() => {
    if (mounted) {

      // Default functions for dark theme
      const direction = state.theme === 'light-theme' ? -1 : 1

      lottieRef.current.setDirection(direction)

      toggle()
    }
  }, [state.theme])

  const toggle = () => {
    lottieRef.current.play()
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={toggleAnimation}
      loop={false}
      autoplay={false}
      onDOMLoaded={() => setLoaded(true)}
    />
  )
}
