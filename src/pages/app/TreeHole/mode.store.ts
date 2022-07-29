import { makeAutoObservable } from 'mobx'

class Modes {
  mode = 'hot'

  constructor() {
    makeAutoObservable(this)
  }

  setMode(mode: string) {
    this.mode = mode
  }
}

export const treeholeListModeStore = new Modes()
