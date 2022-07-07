import { Button } from '@mui/material'
import { navbarStore } from '@/store/navbar.store'
import { observer } from 'mobx-react-lite'

const Home = observer(() => {
  return <>
    <Button variant={'contained'} onClick={() => navbarStore.onOpen()}>Button</Button>
  </>
})

export default Home
