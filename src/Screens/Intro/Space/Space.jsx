// External modules
import { useLottie } from 'lottie-react'

// Internal modules
import space from './space.json'

export default function Space () {

  // Constants
  const options = {
    animationData: space,
    loop: true,
    autoplay: true
  }

  const { View } = useLottie(options)

  return View
}
