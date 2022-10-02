import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import type { SxProps } from '@mui/material'
import { Card, Paper } from '@mui/material'
import { TreeholeCommentsList } from '@/pages/app/TreeHole/detail/CommentList'
import Page from '@/components/page'
import { TreeholeCard } from '@/pages/app/TreeHole/TreeholeListItem'
import type { CustomThemeOptions } from '@/theme/overrides'
import { EmptyData } from '@/components/EmptyData'
import { HoleNotFound } from '@/components/HoleNotFound'
import { CommentFab } from '@/pages/app/TreeHole/detail/CommentFab'
import { useHoleDetail } from '@/swr/useHoleDetail'
import { DetailBreadcrumbs } from '@/pages/app/TreeHole/detail/Breadcrumbs'
import { TreeholeStarIcons } from '@/pages/app/TreeHole/detail/star'

export default function TreeholeDetail() {
  const { isLoading, isSuccess, isNotFound, data } = useHoleDetail()

  return (
    <Page title={'树洞详情'}>

      {isLoading && (
          <Paper>
            <SkeletonPostCard />
          </Paper>
      )}
      {isSuccess && data && (
        <div className={'max-w-[500px]'}>
          <DetailBreadcrumbs data={data} />
          <div className={'grid gap3'}>
            <Card className={'p4'} sx={{
              boxShadow: (theme: CustomThemeOptions) => theme.customShadows.card,
            } as SxProps}>
              <TreeholeCard data={data} />
              <TreeholeStarIcons data={data}/>
            </Card>
            <Card className={`${data!.comments.length > 0 ? 'p4' : ''}`}>
              {
                data!.comments.length > 0
                  ? <TreeholeCommentsList data={data} />
                  : <EmptyData title={'暂时还没有评论哦, 快来一个评论吧~'} />
              }
            </Card>
          </div>
        </div>
      )}
      {isNotFound && <HoleNotFound />}
      <CommentFab />
    </Page>
  )
}
