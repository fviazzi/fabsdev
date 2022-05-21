// External modules
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { FaCircleNotch } from 'react-icons/fa'

// Internal modules
import './Loading.less'

export default function Loading ({ loading, size }) {

  // Local state
  const [show, setShow] = React.useState(false)

  // Loading effect
  React.useEffect(() => {
    setShow(loading)
  }, [loading])

  return (
    <CSSTransition
      timeout={0}
      classNames='loading'
      unmountOnExit
      in={show}
    >
      <div className='loading-container'>
        <FaCircleNotch className='spin' size={size || 28} />
      </div>
    </CSSTransition>
  )
}
