export interface ISkill {
  code: string
  title: string
  description: string
  background?: string
  color?: string
}

export interface IExtendedSkill extends ISkill {
  offsets: {
    x: number
    y: number
    width: number
    height: number
  }
}

export type TSkillSet = {
  title: string
  skills: ISkill[]
}

export type TI18n = {
  en: {
    softSkills: {
      title: string
      skills: ISkill[]
    }
    hardSkills: {
      title: string
      skillSets: TSkillSet[]
    }
  }
  es: {
    softSkills: {
      title: string
      skills: ISkill[]
    }
    hardSkills: {
      title: string
      skillSets: TSkillSet[]
    }
  },
  images: {
    [key: string]: string
  }
}