import type { ReactNode } from 'react'
import React from 'react'
import { Typography } from '@mui/material'

export const EmptyData: React.FC<{
  title: string
  children?: ReactNode
}> = (props) => {
  return (
    <div className={'p-5 py-10 grid gap3 center bg-[#F4F6F8] dark:bg-[#333D48]'}>
      <i className={'text-8xl mx-auto i-noto:empty-nest'} />
      <Typography variant={'subtitle2'}>
        {props.title}
      </Typography>
      <div className={'pt3 center'}>
        {props.children}
      </div>
    </div>
  )
}
