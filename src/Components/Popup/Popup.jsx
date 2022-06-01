// External modules
import React from 'react'
import { CSSTransition } from 'react-transition-group'

// Internal modules
import './Popup.less'

export default function Popup ({ children, offsets }) {

  // Local state
  const [display, setDisplay]   = React.useState(false)
  const [coords, setCoords] = React.useState({})
  const [position, setPosition] = React.useState(false)
  const [render, setRender]     = React.useState(false)

  // Constants
  const popupRef = React.useRef(null)

  // Mount effect
  React.useEffect(() => {

    const container = document.getElementById('main-container')

    container.addEventListener('scroll', scrollHandler)

    return () => container.removeEventListener('scroll', scrollHandler)

  }, [])

  // Offsets effect
  React.useEffect(() => {

    // Display
    const display = offsets && true

    setDisplay(display)

    setTimeout(() => {
      if (display && popupRef.current) {

        // Define initial coords and position
        const coords    = {}
        let position  = 'center'

        // Extract data
        const { scrollHeight, scrollWidth } = popupRef.current
        const { x, y, width, height } = offsets

        // Set values for each position
        const topVals = {
          y: y - scrollHeight - 30,
          x: x - (scrollWidth / 2) + (width / 2) - 10,
          test: {
            top: y - scrollHeight - 20,
            left: (x + (width / 2)) - (scrollWidth / 2),
            right: x + (width / 2) + (scrollWidth / 2),
            bottom: y - 20
          }
        }

        const bottomVals = {
          y: y + height + 10,
          x: x - (scrollWidth / 2) + (width / 2) - 10,
          test: {
            top: y + 10,
            left: (x + (width / 2)) - (scrollWidth / 2),
            right: x + (width / 2) + (scrollWidth / 2),
            bottom: y + height + scrollHeight + 20
          }
        }

        const leftVals = {
          y: y - (scrollHeight / 2) + (height / 2) - 10,
          x: x - scrollWidth - 30,
          test: {
            top: (y + (height / 2)) - (scrollHeight / 2),
            left: x - scrollWidth - 30,
            right: x - 30,
            bottom: (y + (height / 2)) + (scrollHeight / 2)
          }
        }

        const rightVals = {
          y: y - (scrollHeight / 2) + (height / 2) - 10,
          x: x + width + 10,
          test: {
            top: (y + (height / 2)) - (scrollHeight / 2),
            left: x + 10,
            right: x + width +  scrollWidth + 10,
            bottom: (y + (height / 2)) + (scrollHeight / 2)
          }
        }

        // Test top/bottom/left/right position
        if (testBoundaries(topVals.test)) {
          coords.y = topVals.y
          coords.x = topVals.x
          position = 'top'
        } else if (testBoundaries(bottomVals.test)) {
          coords.y = bottomVals.y
          coords.x = bottomVals.x
          position = 'bottom'
        } else if (testBoundaries(leftVals.test)) {
          coords.y = leftVals.y
          coords.x = leftVals.x
          position = 'left'
        } else if (testBoundaries(rightVals.test)) {
          coords.y = rightVals.y
          coords.x = rightVals.x
          position = 'right'
        }

        // Update position
        setPosition(position)

        if (position !== 'center') {
          setCoords({
            x: coords.x,
            y: coords.y
          })
        }
      }
    }, 0)
  }, [offsets])

  // Cords effect
  React.useEffect(() => {
    setRender(true)
  }, [coords])

  // Methods
  const scrollHandler = () => {
    setDisplay(false)
    setRender(false)
  }

  const testBoundaries = values => {
    return (
      values.left > 0 &&
      values.right < window.innerWidth &&
      values.top > 0 &&
      values.bottom < window.innerHeight
    )
  }

  return (
    offsets &&
      <CSSTransition
        timeout={0}
        classNames='popup'
        unmountOnExit
        in={display}
      >
        <div id='popup-container'>

          <div
            className='backdrop'
            onClick={() => setDisplay(false)}
          />

          <div
            ref={popupRef}
            className={`
              content
              ${position}
              ${render ? 'render' : ''}
            `}
            style={{
              top: coords.y ? coords.y : 'auto',
              left: coords.x ? coords.x : 'auto'
            }}
          >

            <button
              className='close-btn'
              onClick={() => setDisplay(false)}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z' /></svg>
            </button>

            {/* Name */}
            <div className='children-container'>
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>
  )
}
