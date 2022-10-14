import { TreeholeBlogCommentItem } from '@/pages/app/TreeHole/detail/CommentItem'

export const TreeholeCommentsList: FC<{
  data: ITreeholeDetailData
}> = ({ data }) => {
  return (
    <div className={'grid gap2 p3 break-all'}>
      {data.comments.map((item) => {
        // const hasReply = item.reply.length > 0

        return (
          <div key={item.createTime}>
            <TreeholeBlogCommentItem data={item} />
            {/* hasReply && <TreeholeReplyList data={item} /> */}
          </div>
        )
      })}
    </div>
  )
}
