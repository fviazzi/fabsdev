// External modules
import { useLottie } from 'lottie-react'

// Internal modules
import rocket from './rocket.json'

export default function Rocket () {

  // Constants
  const options = {
    animationData: rocket,
    loop: false,
    autoplay: true
  }

  const { View } = useLottie(options)

  return View
}
