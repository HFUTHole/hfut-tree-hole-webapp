import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeDetailRequest } from '@/service/api/treehole'
import { TreeholeListCard } from '@/pages/app/TreeHole/TreeholeList'
import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import { Fab, Paper } from '@mui/material'
import { TreeholeCommentsList } from '@/pages/app/TreeHole/detail/CommentList'
import Page from '@/components/page'

export default function TreeholeDetail() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const id = parseInt(params.id!)

  const { data, isLoading, isSuccess } = useQuery([queryKey.treehole.detail, id], () => getTreeholeDetailRequest(id))

  return (
    <Page title={'树洞详情'}>
      <Fab color={'primary'} className={'!fixed right-4 bottom-15'}>
        <i className={'i-ic:outline-quickreply text-2xl'} />
      </Fab>
      {isLoading && (
        <>
          <Paper>
            <SkeletonPostCard />
          </Paper>
        </>
      )}
      {isSuccess && (
        <div className={'grid gap2'}>
          <Paper className={'p4'}>
            <TreeholeListCard data={data} />
          </Paper>
          <Paper className={'p4'}>
            <TreeholeCommentsList data={data} />
          </Paper>
        </div>
      )}
    </Page>
  )
}
