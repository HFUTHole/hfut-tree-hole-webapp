import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'
import { Button, Dialog, DialogActions } from '@mui/material'

interface Props {
  render: ReactNode
  confirmText: string
  handleConfirm: (...args: any[]) => any
  onClose: (...args: any[]) => any
  open: boolean
  cancelText?: string
  confirm?: ButtonProps['color']
  cancel?: ButtonProps['color']
}

export const DialogConfirm = (props: Props) => {
  const handleClose = () => {
    props.onClose()
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open}>
      {props.render}
      <DialogActions>
        <Button
          variant={'outlined'}
          onClick={handleClose}
          color={props.cancel || 'inherit'}
        >
          {props.cancelText || '取消'}
        </Button>
        <Button
          variant={'contained'}
          color={props.confirm || 'primary'}
          onClick={props.handleConfirm}
        >
          {props.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
