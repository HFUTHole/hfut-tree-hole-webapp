import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { holeStarMutation } from '@/service/api/treehole'
import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import type { SxProps } from '@mui/material'
import { Card, IconButton, Paper, Typography } from '@mui/material'
import { TreeholeCommentsList } from '@/pages/app/TreeHole/detail/CommentList'
import Page from '@/components/page'
import { TreeholeListItem } from '@/pages/app/TreeHole/TreeholeListItem'
import type { CustomThemeOptions } from '@/theme/overrides'
import { EmptyData } from '@/components/EmptyData'
import { HoleNotFound } from '@/components/HoleNotFound'
import { CommentFab } from '@/pages/app/TreeHole/detail/CommentFab'
import { useHoleDetail } from '@/swr/useHoleDetail'
import { useTheme } from '@mui/material/styles'
import type { Method } from 'axios'
import { useDebounceFn } from 'ahooks'
import { Icon } from '@/components/Icon'
import { ICONS } from '@/shared/constant/icons'
import { DetailBreadcrumbs } from '@/pages/app/TreeHole/detail/Breadcrumbs'

export function TreeholeDetailBottomIcons({ data }: { data: ITreeholeDetailData }) {
  const theme = useTheme() as CustomThemeOptions

  const id = parseInt(useParams().id! as string)
  const mutation = useMutation((method: Method) => holeStarMutation(id, method))

  const isStar = data.isStar
  const { setQueryData } = useHoleDetail()
  const { run: handleStarClick } = useDebounceFn(() => {
    const starRamda = !isStar ? 1 : -1

    setQueryData((oldData) => {
      oldData!.isStar = !isStar
      oldData!.stars += starRamda

      return oldData!
    })

    const method: Method = !isStar ? 'POST' : 'DELETE'
    mutation.mutate(method, {
      onError() {
        setQueryData((oldData) => {
          oldData!.isStar = isStar
          oldData!.stars += -starRamda

          return oldData!
        })
      },
    })
  }, { wait: 200 })

  return (
    <div className={'center col'}>
      <div className={'text-center'}>
        <IconButton onClick={handleStarClick} style={isStar ? { color: theme.palette.primary.main } : {}}>
          <Icon icon={ICONS.stars}/>
        </IconButton>
        <Typography variant={'subtitle2'}>{data.stars}</Typography>
      </div>
    </div>
  )
}

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
        <div>
          <DetailBreadcrumbs data={data} />
          <div className={'grid gap3'}>
            <Card className={'p4'} sx={{
              boxShadow: (theme: CustomThemeOptions) => theme.customShadows.card,
            } as SxProps}>
              <TreeholeListItem data={data} />
              <TreeholeDetailBottomIcons data={data}/>
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
