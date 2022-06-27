import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import type { ThemeMode } from '@/theme/theme-config/palette'
import { isUndefined } from '@/shared/utils/utils'
import type { ColorPreset, ColorPresetKeys } from '@/theme/utils/getColorPresets'
import getColorPresets, { defaultPreset } from '@/theme/utils/getColorPresets'

const htmlDom = document.querySelector('html')!

const initMode = (mode: ThemeMode) => {
  htmlDom.className = mode
}

class Settings {
  mode: ThemeMode = 'light'

  get isLight() {
    return this.mode === 'light'
  }

  open = false

  currentColorPreset: ColorPreset = defaultPreset

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: '__SETTINGS__',
      properties: ['mode', 'currentColorPreset'],
      storage: window.localStorage,
    }).then(() => {
      initMode(this.mode)
    })
  }

  setLightMode() {
    this.mode = 'light'
    htmlDom.className = 'light'
  }

  setDarkMode() {
    this.mode = 'dark'
    htmlDom.classList.remove('light')
    htmlDom.className = 'dark'
  }

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

  onColorChange(colorKey: ColorPresetKeys) {
    this.currentColorPreset = getColorPresets(colorKey)
  }
}

export const settingsStore = new Settings()
