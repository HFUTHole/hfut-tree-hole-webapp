import { ICONS } from '@/shared/constant/icons'
import { Paper, Typography } from '@mui/material'

export const HoleEmpty = () => {
  return (
    <Paper className={'p5 grid gap5 text-center'}>
      <i className={`${ICONS.treehole} text-8xl mx-auto`} />
      <Typography variant={'subtitle2'}>
        还没有树洞哦~，快来抢第一个Hello World吧!
      </Typography>
    </Paper>
  )
}
