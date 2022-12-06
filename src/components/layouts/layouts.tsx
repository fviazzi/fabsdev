// External modules
import React from 'react'

// Internal modules
import 'normalize.css'

// Components
import Head from 'src/components/head/head'
import Information from './information'
import Intro from './intro'

// Types
type Props = {
  children: JSX.Element | JSX.Element[]
  title?: string
}

export default function Layouts(props: Props) {

  // Extract props
  const { children, title } = props

  return (
    <div id='root'>

      <Head title={title} />

      {children}
    </div>
  )
}

Layouts.Information = Information
Layouts.Intro = Intro
