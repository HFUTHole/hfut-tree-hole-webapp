import { Box, Button, Stack } from '@mui/material'
import { Observer } from 'mobx-react-lite'
import { useState } from 'react'
import { settingsStore } from '@/store/setting.store'

const Lab = () => {
  const [setting] = useState(() => settingsStore)

  return <Observer>
    {() => <Stack direction={'column'} spacing={5}>
      <button className="i-carbon-sun dark:i-carbon-moon" onClick={() => {
        if (setting.mode === 'dark') {
          setting.setLightMode()
        } else {
          setting.setDarkMode()
        }
      }}/>
      <Box className={'center text-3xl col gap2'}>

        <Button variant={'contained'} onClick={() => settingsStore.toggleSettings()}>toggle</Button>
      </Box>
    </Stack>}
  </Observer>
}

export default Lab
