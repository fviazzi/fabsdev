// External modules
import { useLottie } from 'lottie-react'

// Internal modules
import emptySpace from './empty-space.json'

export default function EmptySpace () {

  // Constants
  const options = {
    animationData: emptySpace,
    loop: true,
    autoplay: true
  }

  const { View } = useLottie(options)

  return View
}
