import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import type { ThemeMode } from '@/theme/theme-config/palette'
import { isUndefined } from '@/shared/utils/utils'

const htmlDom = document.querySelector('html')!

const initMode = (mode: ThemeMode) => {
  htmlDom.className = mode
}

class Settings {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: '__SETTINGS__',
      properties: ['mode'],
    }).then(() => {
      initMode(this.mode)
    })
  }

  mode: ThemeMode = 'light'
  setLightMode() {
    this.mode = 'light'
    htmlDom.className = 'light'
  }

  setDarkMode() {
    this.mode = 'dark'
    htmlDom.classList.remove('light')
    htmlDom.className = 'dark'
  }

  open = false
  toggleSettings(open?: boolean) {
    if (!isUndefined(open)) {
      this.open = open
    } else {
      this.open = !this.open
    }
  }

  openSetting() {
    this.toggleSettings(true)
  }

  closeSetting() {
    this.toggleSettings(false)
  }

  resetAll() {
    this.mode = 'light'
  }
}

export const settingsStore = new Settings()
