// External modules
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime.js'

// Internal modules
import 'Assets/loader.js'
import App from './App'
import 'Less/config.less'
asyncImports()

const app  = document.getElementById('app')
const root = ReactDOM.createRoot(app)
root.render(<App />)

async function asyncImports () {
  await import(/* webpackChunkName: "normalize" */ 'normalize.css')
  await import(/* webpackChunkName: "fontawesome" */ '@fortawesome/fontawesome-free/js/all')
}
