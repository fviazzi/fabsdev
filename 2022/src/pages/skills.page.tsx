// External modules
import React from 'react'

// Internal modules
import './skills.less'
import { ISkill, IExtendedSkill, TSkillSet, TI18n } from './skills.types'
import * as language from './skills.i18n.json'
import { AppContext } from 'src/context/app.context'

// Components
import Layouts from 'src/components/layouts/layouts'
import AnimatedSpace from 'src/components/animatedSpace/animatedSpace'
import Popup from 'src/components/popup/popup'

// Constants
const i18n:TI18n = language

export default function Skills () {

  // Global state
  const { state } = React.useContext(AppContext)
  const lang = state.language

  // Local state
  const [skill, setSkill] = React.useState<IExtendedSkill | null>(null)

  // Methods
  const showPopup = (e:React.MouseEvent<HTMLElement>, newSkill:ISkill) => {

    e.stopPropagation()

    setSkill(null)

    if (window.innerWidth > 768 || e.type === 'click') {

      if (!skill || skill.code !== newSkill.code) {

        const target = e.target as HTMLElement
        const rect = target.getBoundingClientRect()

        setSkill({
          ...newSkill,
          offsets: {
            y: rect.top,
            x: rect.left,
            width: rect.width,
            height: rect.height
          }
        })
      }
    }
  }

  return (
    <Layouts title='Skills'>
      <Layouts.Information>
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

              {/* List */}
              <ul>
                {
                  i18n[lang].softSkills.skills.map(skill => (
                    <li
                      key={skill.title}
                    >

                      <figure
                        dangerouslySetInnerHTML={{ __html: i18n.images[skill.code] }}
                      />

                      <div>
                        <h4>{skill.title}</h4>
                        <p dangerouslySetInnerHTML={{ __html: skill.description }} />
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
                  i18n[lang].hardSkills.skillSets.map((skillSet:TSkillSet, index: number):JSX.Element => (
                    <li
                      key={index}
                      className='skill-set'
                    >
                      <h4>{skillSet.title}</h4>

                      <hr />

                      <ul>
                        {
                          skillSet.skills.map((skill: ISkill, index: number) => (
                            <li
                              key={skill.code}
                              className={`
                                skill
                                skill-${skill.code}
                              `}
                              style={{
                                animationDelay: `${index / 15}s`
                              }}
                            >
                              <figure
                                dangerouslySetInnerHTML={{ __html: i18n.images[skill.code] }}
                                style={{
                                  backgroundColor: skill.background,
                                  color: skill.color,
                                  borderColor: skill.color
                                }}
                                onClick={e => showPopup(e, skill)}
                                onMouseEnter={e => showPopup(e, skill)}
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
      </Layouts.Information>
    </Layouts>
  )
}
