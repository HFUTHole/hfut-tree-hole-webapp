import { Box, Card, Divider, Typography } from '@mui/material'
import { UserAvatar } from '@/components/UserAvatar'
import { formatTime } from '@/shared/utils/time'
import { Link } from 'react-router-dom'
import { TreeholeListItemBottomIcons, TreeholeListItemContent } from '@/pages/app/TreeHole/TreeholeListItemContent'
import { ellipsesText } from '@/shared/utils/utils'

export const TreeholeCard: FC<{
  data: ITreeHoleListDataItem | ITreeholeDetailData
}> = ({ data }) => {
  return (
    <div className={'grid gap2'}>
      <Box className={'y-center gap3'}>
        <UserAvatar />
        <div className={'flex j-between w-full'}>
          <Box className={'grid'}>
            <Typography variant={'subtitle2'}>#{data.id}</Typography>
            <p className={'text-secondary !text-xs'}>{formatTime(data.createTime)}</p>
          </Box>
        </div>
      </Box>
      <TreeholeListItemContent content={data} />
    </div>
  )
}

const TreeholeListCommentList: FC<{
  data: ITreeHoleListDataItem | ITreeholeDetailData
}> = ({ data }) => {
  return (
    <div className={'grid w-full gap3 overflow-hidden'}>
      {data.comments.data.map(item => (
        <div key={item._id} className={'y-center text-sm gap2'}>
          <Typography className={'max-w-2/12 !text-sm'} variant={'subtitle2'}>
            {item.isOwner ? '洞主' : item.user.username}
          </Typography>
          <div className={'min-w-6/12 w-full break-words'}>
            <p className={'break-words'}>
              {ellipsesText(item.content, 30)}
            </p>
            <Divider className={'!mt1 w-full'}/>
          </div>
        </div>
      ))}
    </div>
  )
}

export const TreeholeListItem: FC<{
  data: ITreeHoleListDataItem | ITreeholeDetailData
}> = ({ data }) => {
  return (
    <Link to={`detail/${data.id}`}>
      <Card className={'grid gap3 px5 py3'}>
        <div>
          <TreeholeCard data={data} />
          <TreeholeListItemBottomIcons data={data} />
        </div>
        <TreeholeListCommentList data={data}/>
      </Card>
    </Link>
  )
}

