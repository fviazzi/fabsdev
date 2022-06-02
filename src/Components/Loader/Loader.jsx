// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import './Loader.less'

// Components
import planet from './planet.animation.json'

export default function Loader ({ fade }) {

  return (
    <div
      id='loader-container'
      className={fade ? 'fade' : ''}
    >
      <Lottie
        animationData={planet}
        loop
        autoplay
      />
    </div>
  )
}
