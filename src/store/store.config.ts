import { configurePersistable } from 'mobx-persist-store'

configurePersistable({
  storage: window.localStorage,
})
