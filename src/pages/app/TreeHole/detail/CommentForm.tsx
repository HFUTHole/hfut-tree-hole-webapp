import { Card, ClickAwayListener } from '@mui/material'
import { ICONS } from '@/shared/constant/icons'
import { IconButton } from '@/components/IconButton'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputFiled } from '@/components/form/InputFiled'
import type { InferType } from 'yup/es'
import { FormConfig } from '@/shared/constant/form'
import { useMutation } from 'react-query'
import { holeCommentMutation } from '@/service/api/treehole'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'
import { LoadingButton } from '@mui/lab'
import { useDebounceFn } from 'ahooks'
import { useHoleDetail } from '@/swr/useHoleDetail'

const formSchema = yup.object().shape({
  content: yup
    .string()
    .required('评论是不能为空的哦~')
    .max(FormConfig.comment.maxLength, `最多只能发${FormConfig.comment.maxLength}个字哦`),
})

type TFormSchema = InferType<typeof formSchema>

export const CommentForm = observer((props: { setFormOpen: Function }) => {
  const { control, handleSubmit } = useForm<TFormSchema>({
    resolver: yupResolver(formSchema),
    mode: 'all',
  })

  const mutation = useMutation(holeCommentMutation)

  const [store] = useState(() => authStore)

  const { setQueryData, id } = useHoleDetail()
  const { run: onSubmit } = useDebounceFn((data: TFormSchema) => {
    mutation.mutate({
      content: data.content,
      id,
    }, {
      onSuccess(res) {
        setQueryData((oldData) => {
          oldData!.comments.push({
            _id: res.commentId,
            content: data.content,
            user: { username: store.user.username },
            createTime: `${new Date()}`,
            isOwner: true,
          })

          return oldData!
        })
        props.setFormOpen(false)
      },
    })
  }, {
    wait: 500,
  })

  return (
    <ClickAwayListener onClickAway={() => props.setFormOpen(false)}>
      <Card
        className={'absolute p5 !shadow-2xl grid gap2'}
      >
        <div className={'flex j-between'}>
          <IconButton icon={ICONS.close} onClick={() => props.setFormOpen(false)}/>

          <LoadingButton
            variant={'contained'}
            className={'!px5'}
            onClick={handleSubmit(onSubmit)}
            loading={mutation.isLoading}
          >
            发布
          </LoadingButton>
        </div>
        <InputFiled
          multiline
          rows={7}
          variant={'standard'}
          placeholder={'记得要文明评论哦~'}
          control={control}
          name={'content'}
        />
        <div className={'flex j-end'}>
          <IconButton icon={ICONS.img} />
        </div>
      </Card>
    </ClickAwayListener>
  )
})
