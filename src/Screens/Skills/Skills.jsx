// External modules
import React from 'react'
import { CSSTransition } from 'react-transition-group'

// Internal modules
import './Skills.less'
import { AppContext } from 'Context'

// Components
import AnimatedSpace from 'Components/AnimatedSpace/AnimatedSpace'
import Popup from 'Components/Popup/Popup'

// Assets
import i18n from './skills.i18n.json'

export default function Skills () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [mounted, setMounted] = React.useState(false)
  const [skill, setSkill]     = React.useState(null)

  // Mount effect
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Methods
  const onHover = (e, newSkill) => {

    e.stopPropagation()

    if (!skill || skill.code !== newSkill.code) {

      const rect = e.target.getBoundingClientRect()

      newSkill.offsets = {
        y: rect.top,
        x: rect.left,
        width: rect.width,
        height: rect.height
      }

      setSkill(newSkill)
    }
  }

  return (
    <CSSTransition
      timeout={0}
      classNames='skills'
      unmountOnExit
      in={mounted}
    >
      <section id='skills-container' className='page-container'>

        {/* Background */}
        <AnimatedSpace blur />

        {/* Popup */}
        {
          skill &&
            <Popup offsets={skill.offsets}>
              <h4>{skill.title}</h4>
              <p>{skill.description}</p>
            </Popup>
        }

        <div className='container'>

          <div className='soft-skills content'>

            <h1>{i18n[lang].softSkills.title}</h1>

            <p>
              {i18n[lang].softSkills.description}
            </p>

            {/* List */}
            <ul>
              {
                i18n[lang].softSkills.skills.map(skill => (
                  <li
                    key={skill.title}
                  >

                    <figure
                      dangerouslySetInnerHTML={{ __html: skill.icon }}
                    />

                    <div>
                      <h4>{skill.title}</h4>
                      <p>
                        {skill.description}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>

          </div>

          <div className='hard-skills content'>

            <h1>{i18n[lang].hardSkills.title}</h1>

            {/* List */}
            <ul>
              {
                i18n[lang].hardSkills.skillSets.map((category, index) => (
                  <li
                    key={index}
                    className='skill-set'
                  >
                    <h4>{category.title}</h4>

                    <hr />

                    <ul>
                      {
                        category.skills.map(skill => (
                          <li
                            key={skill.code}
                            className={`skill skill-${skill.code}`}
                          >
                            <figure
                              dangerouslySetInnerHTML={{ __html: i18n.images[skill.code] }}
                              style={{
                                backgroundColor: skill.background,
                                color: skill.color,
                                borderColor: skill.color
                              }}
                              onMouseEnter={e => onHover(e, skill)}
                              onMouseLeave={() => setSkill(null)}
                            />
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </section>
    </CSSTransition>
  )
}
