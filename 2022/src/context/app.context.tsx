// External modules
import React from 'react'

// Internal modules
import { Context } from './app.types'

export const AppContext  = React.createContext<Context>({} as Context)
export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
