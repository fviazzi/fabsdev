// External modules
import React from 'react'
import { useRouter } from 'next/router'

// Internal modules
import './information.less'
import { AppContext } from 'src/context/app.context'

// Components
import Header from 'src/components/header/header'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export default function Information({ children }: Props) {

  // Global state
  const { state } = React.useContext<any>(AppContext)

  // Local state
  const [theme, setTheme] = React.useState(state.theme)

  // Hooks
  const router = useRouter()
  const container = React.useRef<HTMLDivElement>(null)

  // Theme effect
  React.useEffect(() => {
    setTheme(state.theme)
  }, [state.theme])

  // Route effect
  React.useEffect(() => {

    // Scroll to form position
    setTimeout(() => {

      if (container?.current) {

        container.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }

    }, 0)

  }, [router.route, container])

  return (
    <main
      id='main-container'
      className={`${theme} lang-${state.language}`}
      ref={container}
    >

      <Header />

      {children}
    </main>
  )
}


