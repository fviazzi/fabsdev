// External modules
import { useLottie } from 'lottie-react'

// Internal modules
import rocketAnimation from './rocket.json'

export default function Rocket () {

  // Constants
  const options = {
    animationData: rocketAnimation,
    loop: true,
    autoplay: true
  }

  const { View } = useLottie(options)

  return View
}
