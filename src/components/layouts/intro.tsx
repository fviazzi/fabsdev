// External modules
import React from 'react'

// Internal modules
import './intro.less'
import { AppContext } from 'src/context/app.context'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export default function Intro(props: Props) {

  // Extract props
  const { children } = props

  // Global state
  const { state, dispatch } = React.useContext<any>(AppContext)

  return (
    <main
      id='main-container'
      className={`${state.theme} lang-${state.language}`}
    >

      {children}
    </main>
  )
}


