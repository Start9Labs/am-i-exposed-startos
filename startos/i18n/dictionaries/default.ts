export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Am I Exposed?': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  'Waiting for Tor proxy to be ready': 4,
  'Tor proxy is ready': 5,

  // interfaces.ts
  'Web UI': 6,
  'The web interface of Am I Exposed?': 7,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
