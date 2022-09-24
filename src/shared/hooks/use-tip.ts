import { useSnackbar } from 'notistack'
import type { AlertColor } from '@mui/material/Alert/Alert'

export function useTip() {
  const { enqueueSnackbar } = useSnackbar()

  function generateTipUtil(variant: AlertColor) {
    return (msg: string) => enqueueSnackbar(msg, { variant })
  }

  const successTip = generateTipUtil('success')

  const errorTip = generateTipUtil('error')

  const infoTip = generateTipUtil('info')

  return {
    successTip,
    errorTip,
    infoTip,
    enqueueSnackbar,
  }
}
