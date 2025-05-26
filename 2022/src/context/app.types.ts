type Action =
  | { type: 'UPDATE_THEME'; data: 'light-theme' | 'dark-theme' }
  | { type: 'UPDATE_LANG'; data: 'en' | 'es' }
  | { type: 'UPDATE_SECTION'; data: string }

interface State {
  theme: 'light-theme' | 'dark-theme'
  section: string
  language: 'en' | 'es'
}

interface Context {
  state: State,
  dispatch: (action: Action) => void
}

export type {Action, Context, State}
