// External modules
import React from 'react'

// Internal modules
import './Loader.less'

// Components
import Wave from './Wave/Wave'

export default function Loader ({ fade }) {

  return (
    <div
      id='loader-container'
      className={fade ? 'fade' : ''}
    >
      <Wave />
    </div>
  )
}
