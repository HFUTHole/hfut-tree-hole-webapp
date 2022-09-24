import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { FieldErrors } from 'react-hook-form'
import { FailedAlert, SuccessAlert } from '@/components/SnackbarAlert'
import { useMutation } from 'react-query'
import { postHoleMutation } from '@/service/api/treehole'
import { useDebounceFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { Card } from '@mui/material'
import { UserAvatar } from '@/components/UserAvatar'
import { InputFiled } from '@/components/form/InputFiled'
import { IconButton } from '@/components/IconButton'
import { ICONS } from '@/shared/constant/icons'
import { CreateTreeholeVote } from '@/pages/app/TreeHole/new/vote'

interface Inputs {
  content: string
}

const schema = yup.object().shape({
  content: yup.string().required('树洞内容不能为空'),
})

export const CreateHoleForm = () => {
  const navigate = useNavigate()

  const mutate = useMutation(postHoleMutation)
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const { run: onSubmit } = useDebounceFn((data: Inputs) => {
    setLoading(true)
    mutate.mutate(data.content, {
      onSuccess() {
        setLoading(false)
        SuccessAlert({ msg: '创建树洞成功' })
        navigate('/app')
      },
      onError() {
        setLoading(false)
      },
    })
  }, { wait: 200 })

  const onError = (err: FieldErrors<Inputs>) => {
    FailedAlert({
      msg: err.content!.message!,
    })
  }

  return (
    <div>
      <Card className={'grid gap3 p3'}>
        <UserAvatar />
        <InputFiled
          multiline
          rows={18}
          variant={'standard'}
          placeholder={'记得在树洞里要文明哦~'}
          control={control}
          name={'content'}
        />
        <div className={'flex j-end items-center'}>
          <div className={'flex gap2'}>
            <CreateTreeholeVote />
            <IconButton icon={ICONS.img} />
          </div>
        </div>
      </Card>
    </div>
  )
}
