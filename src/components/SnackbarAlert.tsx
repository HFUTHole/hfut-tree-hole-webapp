import type { AlertProps, SnackbarProps } from '@mui/material'
import { Alert, Snackbar, Typography } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { AlertTitle } from '@mui/lab'

export interface AlertTipProps {
  snackProps?: SnackbarProps
  alertProps?: AlertProps
  msg: string
  title?: string
}

export function SnackbarAlert({
  snackProps,
  alertProps,
  msg,
  title,
}: AlertTipProps) {
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      anchorOrigin={
        snackProps?.anchorOrigin
          ? snackProps.anchorOrigin
          : { vertical: 'top', horizontal: 'right' }
      }
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={snackProps?.autoHideDuration || 6000}
      {...snackProps}
    >
      <Alert severity="info" className={'w-full'} {...alertProps}>
        {title && <AlertTitle>{title}</AlertTitle>}
        <Typography variant={'subtitle2'} className={'!text-xs'}>
          {msg}
        </Typography>
      </Alert>
    </Snackbar>
  )
}

export function AlertTip(props: AlertTipProps) {
  const el = document.createElement('div')
  const container = createRoot(el)

  container.render(<SnackbarAlert {...props} />)

  document.getElementById('root')?.append(el)
}
