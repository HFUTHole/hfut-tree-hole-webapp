import { format } from 'date-fns'

export const formatTime = (time: string | Date) => {
  time = typeof time === 'string' ? new Date(time) : time

  return format(time, 'yyyy年M月d日 HH:mm:ss')
}
