import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MyEditor } from '@/components/editor/Editor'
import type { FieldErrors } from 'react-hook-form'
import { FailedAlert, SuccessAlert } from '@/components/SnackbarAlert'
import { useMutation } from 'react-query'
import { postHoleMutation } from '@/service/api/treehole'
import { LoadingButton } from '@mui/lab'
import { useDebounceFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'

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
    <div className={'grid gap3'}>
      <MyEditor control={control} name={'content'}/>
      <LoadingButton
        className={'flex1'}
        variant={'contained'}
        onClick={handleSubmit(onSubmit, onError)}
        loading={loading}
      >
        发布
      </LoadingButton>
    </div>
  )
}
