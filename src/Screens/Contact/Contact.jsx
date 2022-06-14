// External modules
import React from 'react'

// Internal modules
import './Contact.less'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'
import ContactData from './ContactData/ContactData'
import Thanks from './Thanks/Thanks'
import Form from './Form/Form'

export default function Contact () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [viewport, setViewport] = React.useState('desktop')

  // Mount effect
  React.useEffect(() => {

    window.addEventListener('resize', resizeHandler)

    // Call resize handler on mount
    resizeHandler()

    return () => window.removeEventListener('resize', resizeHandler)

  }, [])

  // Methods
  const resizeHandler = () => {

    if (window.innerWidth < 768) {
      setViewport('mobile')
    } else {
      setViewport('desktop')
    }
  }

  return (
    <section id='contact-container' className='page-container'>

      {/* Background */}
      <AnimatedSpace blur />

      {/* Content */}
      <div className='container'>

        {/* Desktop viewport */}
        {
          viewport === 'desktop' &&
            <>
              {/* First column */}
              <div className='col'>
                <ContactData lang={lang} />
                <Thanks lang={lang} />
              </div>

              {/* Second column */}
              <div className='col'>
                <Form lang={lang} />
              </div>
            </>
        }

        {/* Mobile viewport */}
        {
          viewport === 'mobile' &&
            <div className='col'>
              <ContactData lang={lang} />
              <Form lang={lang} />
              <Thanks lang={lang} />
            </div>
        }
      </div>

    </section>
  )
}
