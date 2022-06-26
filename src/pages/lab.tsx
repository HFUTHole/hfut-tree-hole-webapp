import { Box, Button, Stack, Typography } from '@mui/material'
import { Observer, observer } from 'mobx-react-lite'
import { useState } from 'react'
import { TimerStore } from '@/store/auth.store'
import { settingsStore } from '@/store/setting.store'

const Lab = () => {
  const [setting] = useState(() => settingsStore)

  return <Observer>
    {() => <Stack direction={'column'} spacing={5}>
      <div className="mt-4 -mb-3">
        <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
          <div
            className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
          ></div>
          <div className="relative rounded-xl overflow-auto p-8">
            <div className="flex items-center justify-center">
            <span className="relative inline-flex">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed ring-1 ring-slate-900/10 dark:ring-slate-200/20"
              >
                Powered by Unocss
              </button>
              <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-auto p-8">
        <div className="flex items-center justify-center">
          <div
            className="bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-900/5 rounded-lg shadow-lg max-w-xs w-full h-28">
            <div className="flex space-x-4 animate-pulse">
              <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-auto p-8">
        <div className="flex justify-center">
          <div
            className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-violet-500" fill="none" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      <Stack direction={'row'} className={'center text-3xl'} spacing={5}>
        <div className="i-ph-anchor-simple-thin" />
        <div className="i-mdi-alarm text-orange-400" />
        <div className="i-logos-vue" />
        <div className={'i-vscode-icons:file-type-reactjs'} />
        <div className={'i-logos:unocss'} />
        <button className="i-carbon-sun dark:i-carbon-moon" onClick={() => {
          if (setting.mode === 'dark') {
            setting.setModeLight()
          } else {
            setting.setModeDark()
          }
        }}/>
        <div className="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
      </Stack>

      <Box className={'center text-3xl col gap2'}>
        <Typography>
          {TimerStore.status}
        </Typography>
        <Button variant={'contained'} onClick={() => {
          if (TimerStore.status === 'logout') {
            TimerStore.login()
          } else {
            TimerStore.logout()
          }
        }}>{TimerStore.status === 'logout' ? 'login' : 'logout'}</Button>
      </Box>
    </Stack>}
  </Observer>
}

export default Lab
