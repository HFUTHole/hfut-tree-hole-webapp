import { Card, Typography } from '@mui/material'
import Page from '@/components/page'
import type { ReactNode } from 'react'
import React from 'react'

export const HoleNotFound: React.FC<{ children?: ReactNode }> = (props) => {
  return <Page title={'树洞不存在'}>
    <Card className={'grid gap2 p2 bg-red'}>
      <Typography variant={'subtitle2'}>
        该树洞不存在
      </Typography>
      {props.children}
    </Card>
  </Page>
}
