import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import { DialogTitle } from '@mui/material'
import { HeaderBreadcrumbs } from '@/components/breadcrubmbs/HeaderBreadcrumbs'
import { ConfirmDialog } from '@/components/DialogConfirm'
import { useMutation } from 'react-query'
import { removeOrReportHoleMutation } from '@/service/api/treehole'
import { useHoleDetail } from '@/pages/app/TreeHole/detail/useHoleDetail'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { useDebounceFn } from 'ahooks'

export const DetailBreadcrumbs = ({ data }: { data: ITreeholeDetailData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const mutate = useMutation(removeOrReportHoleMutation)
  const { id } = useHoleDetail()
  const navigate = useNavigate()

  const { run: handleConfirmClick } = useDebounceFn(() => {
    setLoading(true)
    mutate.mutate({ id }, {
      onSuccess() {
        setLoading(false)
        navigate('/app')
      },
    })
  }, { wait: 100 })

  return (
    <div>
      <ConfirmDialog
        confirmText={'删除'}
        confirm={'error'}
        handleConfirm={handleConfirmClick}
        open={open}
        onClose={() => setOpen(false)}
        render={<DialogTitle>确定要{data.isOwner ? '删除' : '举报'}这个树洞吗?</DialogTitle>}
      />
      <HeaderBreadcrumbs
        heading="树洞"
        links={[
          { name: '树洞广场', href: '/app/treehole' },
          { name: '树洞详情', href: '' },
        ]}
        action={<LoadingButton
          loading={loading}
          variant="contained"
          color={'error'}
          onClick={() => setOpen(true)}
        >
          {data.isOwner ? '删除' : '举报'}
        </LoadingButton>}
      />
    </div>
  )
}
