// External modules
import React from 'react'
import Lottie from 'lottie-react'

// Internal modules
import './Form.less'
import i18n from './form.i18n.json'
import contactService from './contact.service'
import initialInputs from './inputs.json'
import ufo from './ufo.animation.json'

export default function Form ({ lang }) {

  // Local state
  const [isValid, setIsvalid]     = React.useState(false)
  const [inputs, setInputs]       = React.useState(initialInputs)
  const [formState, setFormState] = React.useState('ready')
  const [newState, setNewState]   = React.useState('ready')
  const [minHeight, setMinHeight] = React.useState(0)
  const [sendError, setSendError] = React.useState(true)

  // Constants
  const formRef = React.useRef(null)

  // Form ref effect
  React.useEffect(() => {
    if (formRef && formRef.current) {
      setMinHeight(formRef.current.scrollHeight)
    }
  }, [formRef])

  // Inputs effect
  React.useEffect(() => {

    // Validate inputs
    let isValid = true

    for (const field in inputs) {
      if (!inputs[field].valid) {
        isValid = false
        break
      }
    }

    setIsvalid(isValid)

  }, [inputs])

  // NewState effect
  React.useEffect(() => {

    switch (newState) {

      case 'sent':
        formState === 'animated' ? setFormState('done') : setFormState(newState)
        break

      case 'animated':
        formState === 'sent' ? setFormState('done') : setFormState(newState)
        break

      default:
        setFormState(newState)
    }

  }, [newState])

  // Methods
  const changeHandler = e => {

    // Extract props
    const { value, name } = e.target

    if (value) {

      // Update inputs
      inputs[name].value = value

      // Validate input
      let valid = false
      const emailRegex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

      switch (name) {

        case 'email':
          valid = value.length > 2 && emailRegex.test(value)
          break

        case 'message':
          valid = value.length > 10
          break
      }

      inputs[name].valid = valid

      // Update state
      setInputs({ ...inputs })
    }
  }

  const onEnterKey = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      submit()
    }
  }

  const submit = async () => {

    if (isValid) {

      setSendError(false)

      setNewState('sending')

      // Scroll to form position
      setTimeout(() => {
        const container = document.getElementById('main-container')
        container.scrollTo({
          top: formRef.current.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      }, 0)

      // Do request
      const body = {}

      for (const field in inputs) {
        body[field] = inputs[field].value
      }

      const response = await contactService(body)

      if (!response.success) {
        setSendError(true)
      }

      setNewState('sent')

      setTimeout(() => {
        setNewState('animated')
      }, 4000)
    }
  }

  const restartForm = () => {
    setFormState('ready')
    setNewState('ready')
  }

  return (
    <div
      id='contact-form'
      ref={formRef}
      style={{ minHeight }}
    >

      {/* Form */}
      {
        formState !== 'done' &&
          <div
            id='form-container'
            className={formState !== 'ready' ? 'leave' : ''}
          >

            <h2>{i18n[lang].title}</h2>

            <p>{i18n[lang].text}</p>

            <p>{i18n[lang].emailText}</p>

            {/* Email input */}
            <div className='input-container'>
              <input
                type='email'
                name='email'
                placeholder={i18n[lang].emailPlaceholder}
                defaultValue={inputs.email.value}
                disabled={formState !== 'ready'}
                onChange={changeHandler}
                onKeyDown={onEnterKey}
              />
            </div>

            <p>{i18n[lang].messageText}</p>

            {/* Message input */}
            <div className='input-container'>
              <textarea
                name='message'
                placeholder={i18n[lang].messagePlaceholder}
                defaultValue={inputs.message.value}
                disabled={formState !== 'ready'}
                onChange={changeHandler}
                onKeyDown={onEnterKey}
              />
            </div>

            {/* Submit btn */}
            <button
              className={
                isValid ? 'valid main-btn' : 'main-btn'
              }
              disabled={!isValid || formState !== 'ready'}
              onClick={submit}
            >
              {i18n[lang].submitBtn}
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><path d='M471.76 3.13c-133.73 15.4-244.46 111.31-277.6 240.56-4.48 17.94-8.97 51.47-8.97 67.84 0 19.11 2.53 21.83 28.27 32.17 60.24 23.98 131.39 41.13 209.57 50.49 35.67 4.29 137.05 4.87 172.53.97 34.31-3.9 76.03-11.11 107.61-18.91 52.44-13.06 116.77-36.26 125.15-45.42 4.49-5.07 4.68-5.85 3.51-27.68C822.47 120.68 656.18-17.93 471.76 3.13zm39.96 72.91c3.51 3.31 4.87 6.82 4.87 12.09-.19 12.28-7.41 18.13-22.03 18.13-4.87 0-15.4 1.17-23.2 2.73-60.43 11.5-110.92 57.31-128.27 116.19-2.73 9.16-6.04 16.38-9.16 18.91-10.53 9.94-27.88 2.53-27.88-11.7 0-15.99 15.79-53.61 32.17-76.42 11.5-16.18 38.21-41.52 54.98-52.44 31.39-20.27 67.26-31.78 100.59-32.17 11.5-.19 13.84.39 17.93 4.68zM150.49 207.63C60.23 255.58 5.26 328.88 10.32 394.58c4.49 57.51 51.86 109.76 136.27 150.11 68.62 32.95 145.24 52.83 245.24 63.94 46.01 5.07 170.38 5.07 216.39 0 164.93-18.13 293.4-69.59 349.93-140.36 41.33-51.66 42.5-108 3.12-168.04-24.37-37.43-59.65-69.99-103.32-95.33-9.75-5.65-12.08-6.43-11.3-3.7 14.23 43.47 19.5 72.13 19.69 106.83.19 24.56-.19 28.07-4.09 35.29-7.02 13.26-19.49 22.42-42.89 31.78-142.91 57.3-293.01 72.51-454.23 45.8-53.22-8.77-117.36-26.12-162.97-44.06-48.15-19.1-56.53-34.9-50.1-93.57 2.34-21.44 10.53-58.48 16.38-75.44 1.75-4.68 3.12-8.77 3.12-9.16-.02-1.76-4.11-.21-21.07 8.96zm706.48 203.72c33.93 17.35 33.54 58.48-.77 83.04-17.35 12.29-29.44 16.19-52.06 16.19-23.39.2-35.48-4.09-47.57-17.35-20.86-22.61-12.28-54.78 19.89-75.44 15.4-9.75 29.05-13.26 50.29-12.67 16.38.38 20.09 1.16 30.22 6.23zM258.3 423.82c52.05 18.32 65.7 71.35 24.56 94.55-9.16 5.07-13.26 6.04-28.07 6.63-34.7 1.75-65.5-13.65-79.15-39.38-14.04-26.71-.59-54 31.97-64.92 10.92-3.5 36.06-1.95 50.69 3.12zm307.23 56.54c14.62 5.65 25.73 13.84 32.36 23.98 4.68 7.02 5.46 10.14 5.46 22.22 0 12.48-.58 15.01-5.85 22.42-7.41 10.33-20.47 19.5-35.29 24.37-15.6 5.07-55.17 5.26-71.15.39-14.43-4.48-28.46-14.23-35.67-24.56-4.68-6.63-6.04-10.92-6.63-20.86-.78-10.92-.2-13.65 4.29-21.25 8.38-14.23 22.03-23.78 42.69-29.44 15.59-4.48 55.56-2.93 69.79 2.73zm-282.28 169.8c-2.34.97-5.65 3.7-7.21 6.24-4.68 7.41-90.85 238.23-90.85 243.49 0 12.08 14.04 20.28 24.95 14.62 6.82-3.51 3.51 4.49 60.04-146.21 36.06-95.91 37.82-101.37 35.67-107.81-1.56-4.87-4.09-7.6-8.77-9.55-7.4-3.12-7.98-3.12-13.83-.78zm471.96.78c-6.43 2.92-11.7 12.48-9.94 18.13 1.76 7.02 87.73 233.74 90.26 238.62 3.12 6.24 12.09 10.14 19.11 8.38 6.63-1.56 12.87-9.55 12.87-16.18-.19-7.21-88.9-241.93-92.99-246.02-5.07-4.88-12.29-6.05-19.31-2.93zm-316.78 62.58c-2.73 1.56-6.04 5.26-7.21 8.19-2.14 5.85-35.48 248.95-35.48 259.28 0 8.97 1.75 12.09 8.19 15.4 7.8 4.09 18.13 2.14 22.22-4.09 2.14-3.51 8.38-42.31 20.47-131.01l17.35-132.56c-.01-12.68-14.63-21.45-25.54-15.21zm161.99-1.57c-7.41 2.73-11.7 9.16-11.7 16.96.2 4.48 7.8 64.33 17.35 133.15 12.48 91.43 17.93 126.33 20.28 130.03 8.77 13.25 30.6 6.04 30.6-10.14 0-9.16-32.75-249.34-35.09-258.11-2.72-9.94-12.47-15.2-21.44-11.89z' /></svg>
            </button>

          </div>
      }

      {/* Ufo animation */}
      {
        formState !== 'ready' && formState !== 'done' &&
          <div id='ufo-animation-container'>
            <Lottie
              animationData={ufo}
              loop={false}
              autoplay
            />
          </div>
      }

      {/* Sent message */}
      {
        formState === 'done' && !sendError &&
          <div id='message-sent-container'>
            <h2>{i18n[lang].sentTitle}</h2>
            <p>{i18n[lang].sentText1}</p>
            <p>{i18n[lang].sentText2}</p>
          </div>
      }

      {/* Error message */}
      {
        formState === 'done' && sendError &&
          <div id='message-sent-container'>
            <h2>{i18n[lang].sentError1}</h2>
            <p>{i18n[lang].sentError2}</p>
            <button
              className='main-btn'
              onClick={restartForm}
            >
              {i18n[lang].sentError3}
            </button>
          </div>
      }
    </div>
  )
}
