import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import { TreeholeBlogCommentItem } from '@/pages/app/TreeHole/detail/CommentItem'
import { Divider, IconButton, Typography } from '@mui/material'
import { ICONS } from '@/shared/constant/icons'
import { TreeholeReplyList } from '@/pages/app/TreeHole/detail/CommentReply'

export function TreeholeDetailBottomIcons({ data }: { data: ITreeholeDetailData }) {
  return (
    <div className={'center col'}>
      <div className={'text-center'}>
        <IconButton>
          <i className={ICONS.stars} />
        </IconButton>
        <Typography variant={'subtitle2'}>{data.stars}</Typography>
      </div>
    </div>
  )
}

export function TreeholeCommentsList({ data }: { data: ITreeholeDetailData }) {
  return (
    <div className={'grid gap2'}>
      {data.comments.map((item) => {
        const hasReply = item.reply.length > 0

        return (
          <div key={item.createTime}>
            <TreeholeBlogCommentItem data={item} />
            {hasReply && <TreeholeReplyList data={item} />}
            <Divider
              sx={{
                ml: 'auto',
                width: theme => `calc(100% - ${theme.spacing(7)})`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
