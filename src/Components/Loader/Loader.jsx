// External modules
import React from 'react'

// Internal modules
import './Loader.less'

// Components
import Loading from 'Components/Loading/Loading'

export default function Loader () {

  return (
    <div id='loader-container'>
      <Loading loading />
    </div>
  )
}
