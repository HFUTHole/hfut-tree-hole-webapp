import { useHoleDetail } from '@/swr/useHoleDetail'
import { useMutation } from 'react-query'
import { removeOrReportHoleMutation } from '@/service/api/treehole'
import { useNavigate } from 'react-router-dom'
import { useDebounceFn } from 'ahooks'
import type { IReportMsgSchema } from '@/pages/app/TreeHole/detail/Breadcrumbs'
import { useTip } from '@/shared/hooks/use-tip'

export function useBreadcrumbsLogic(data: ITreeholeDetailData) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useHoleDetail()
  const navigate = useNavigate()

  const isOwner = useMemo(() => data.isOwner, [data])
  const confirmText = useMemo(() => isOwner ? '删除' : '举报', [isOwner])

  const mutation = useMutation(removeOrReportHoleMutation)

  const { successTip } = useTip()

  const close = () => {
    setLoading(false)
    setOpen(false)
  }

  const { run: handleConfirmClick } = useDebounceFn((formData: IReportMsgSchema) => {
    setLoading(true)

    mutation.mutate({ id, isReport: !data.isOwner, msg: formData.msg }, {
      onSuccess(data) {
        close()

        successTip('举报成功')
        if (isOwner) {
          navigate('/app')
        }
      },
      onError() {
        close()
      },
    })
  }, { wait: 100 })

  return {
    open,
    setOpen,
    loading,
    id,
    isOwner,
    confirmText,
    handleConfirmClick,
  }
}
