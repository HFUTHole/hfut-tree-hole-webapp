import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import type { ThemeMode } from '@/theme/theme-config/palette'

const htmlDom = document.querySelector('html')!

class Settings {
  mode: ThemeMode = 'light'
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: '__SETTINGS__',
      properties: ['mode'],
    })
  }

  setModeLight() {
    this.mode = 'light'
    htmlDom.className = 'light'
  }

  setModeDark() {
    this.mode = 'dark'
    htmlDom.classList.remove('light')
    htmlDom.className = 'dark'
  }
}

export const settingsStore = new Settings()
