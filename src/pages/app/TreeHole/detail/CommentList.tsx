import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import { TreeholeBlogCommentItem } from '@/pages/app/TreeHole/detail/CommentItem'

export function TreeholeCommentsList({ data }: { data: ITreeholeDetailData }) {
  return (
    <div className={'grid gap2'}>
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
