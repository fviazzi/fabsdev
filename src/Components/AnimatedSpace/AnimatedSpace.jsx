// External modules
import React from 'react'

// Internal modules
import './AnimatedSpace.less'

// Components
import Space from './Space/Space'
import EmptySpace from './EmptySpace/EmptySpace'

export default function AnimatedSpace ({ planets, blur, scale }) {

  return (
    <div
      id='section-background-container'
      className={`
      ${blur ? 'blur' : ''}
      ${scale ? 'scale' : ''}
      `}
    >
      {
        planets ? <Space /> : <EmptySpace />
      }
    </div>
  )
}
