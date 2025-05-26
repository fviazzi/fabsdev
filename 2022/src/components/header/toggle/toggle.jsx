// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import toggleAnimation from './toggle.json'
import { AppContext } from 'src/context/app.context'

export default function Toggle () {

  // Global state
  const { state } = React.useContext(AppContext)

  // Constants
  const lottieRef = React.useRef(null)

  // Mount effect
  React.useEffect(() => {

    // Default functions for dark theme
    const direction = state.theme === 'light-theme' ? -1 : 1

    lottieRef.current.setDirection(direction)

    toggle()

  }, [state.theme])

  // Methods
  const onLoad = () => {

    if (lottieRef.current) {

      lottieRef.current.setSpeed(2)
      lottieRef.current.stop()

      if (state.theme === 'dark-theme') {
        lottieRef.current.setDirection(1)
        lottieRef.current.play()
      }
    }

  }

  const toggle = () => {
    lottieRef.current.play()
  }
  

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={toggleAnimation}
      loop={false}
      autoplay={false}
      onDOMLoaded={onLoad}
    />
  )
}
