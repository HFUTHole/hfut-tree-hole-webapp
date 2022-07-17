import AvatarImg from '@/assets/imgs/avatar.png'
import type { AvatarProps } from '@mui/material'
import { Avatar } from '@mui/material'

export function UserAvatar(props: AvatarProps) {
  return <Avatar
    src={AvatarImg}
    {...props}
  />
}
