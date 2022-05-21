// External modules
import React from 'react'

// Internal modules
import './Button.less'

export default function Button ({ content }) {

  return (
    <button className='main-btn'>
      {content}
    </button>
  )
}
