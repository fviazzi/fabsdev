// External modules
import React from 'react'

// Internal modules
import './animatedSpace.less'

// Components
import Space from './space/space'
import EmptySpace from './emptySpace/emptySpace'

// Props type
type Props = {
  planets?: boolean
  blur?: boolean
  scale?: boolean
}

export default function AnimatedSpace ({ planets, blur, scale }: Props) {

  return (
    <div
      id='section-background-container'
      className={`${blur ? 'blur' : ''} ${scale ? 'scale' : ''}`}
    >
      {
        planets ? <Space /> : <EmptySpace />
      }
    </div>
  )
}
