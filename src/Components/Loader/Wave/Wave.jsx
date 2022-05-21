// External modules
import { useLottie } from 'lottie-react'

// Internal modules
import waveAnimation from './wave.json'

export default function Wave () {

  // Constants
  const options = {
    animationData: waveAnimation,
    loop: true,
    autoplay: true
  }

  const { View } = useLottie(options)

  return View
}
