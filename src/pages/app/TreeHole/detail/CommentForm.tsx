import { Button, Card, TextField } from '@mui/material'
import { ICONS } from '@/shared/constant/icons'
import { IconButton } from '@/components/IconButton'

export const CommentForm = (props: { setFormOpen: Function }) => {
  return (
    <Card
      className={'absolute p5 !shadow-2xl grid gap2'}
    >
      <div className={'flex j-between'}>
        <IconButton icon={ICONS.close} onClick={() => props.setFormOpen(false)}/>

        <Button variant={'contained'} className={'!px5'}>发布</Button>
      </div>
      <TextField
        multiline
        rows={7}
        variant={'standard'}
        placeholder={'记得要文明评论哦~'}
      />
      <div className={'flex j-end'}>
        <IconButton icon={ICONS.img} />
      </div>
    </Card>
  )
}
