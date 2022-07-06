import { makeAutoObservable } from 'mobx'

class Navbar {
  open = true

  constructor() {
    makeAutoObservable(this)
  }

  onClose() {
    this.open = false
  }

  onOpen() {
    this.open = true
  }
}

export const navbarStore = new Navbar()
