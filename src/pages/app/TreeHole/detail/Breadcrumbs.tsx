import { DialogContent, DialogTitle } from '@mui/material'
import { HeaderBreadcrumbs } from '@/components/breadcrubmbs/HeaderBreadcrumbs'
import { ConfirmDialog } from '@/components/DialogConfirm'
import { LoadingButton } from '@mui/lab'
import { useBreadcrumbsLogic } from '@/pages/app/TreeHole/detail/logic'
import { useForm } from 'react-hook-form'
import { InputFiled } from '@/components/form/InputFiled'
import * as yup from 'yup'
import type { Shape } from '@/shared/types/utils'
import { yupResolver } from '@hookform/resolvers/yup'

export interface IReportMsgSchema {
  msg: string
}

const schema = yup.object().shape<Shape<IReportMsgSchema>>({
  msg: yup.string().max(200, '举报内容最多只能为200字哦'),
})

export const DetailBreadcrumbs = ({ data }: { data: ITreeholeDetailData }) => {
  const {
    open,
    setOpen,
    loading,
    confirmText,
    handleConfirmClick,
    isOwner,
  } = useBreadcrumbsLogic(data)

  const {
    control,
    handleSubmit,
  } = useForm<IReportMsgSchema>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      msg: '',
    },
  })

  return (
    <div>
      <ConfirmDialog
        confirmText={confirmText}
        confirm={'error'}
        handleConfirm={handleSubmit(handleConfirmClick)}
        open={open}
        onClose={() => setOpen(false)}
        render={<div className={'grid gap2'}>
          <DialogTitle>确定要{confirmText}这个树洞吗?</DialogTitle>
          {!isOwner && <DialogContent>
            <InputFiled<IReportMsgSchema>
              control={control}
              name={'msg'}
              multiline
              fullWidth
              rows={4}
              placeholder="请输入你想举报的内容(最多200字，可不填)"
            />
          </DialogContent>}
        </div>}
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
