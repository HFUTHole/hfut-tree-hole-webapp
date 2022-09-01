import { Card } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { InputFiled } from '@/components/form/InputFiled'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { authStore } from '@/store/auth.store'
import { usernameSchema } from '@/pages/auth/formValidator'
import { useMutation } from 'react-query'
import { updateUserInfoMutation } from '@/service/api/user'
import { SuccessAlert, WarningAlert } from '@/components/SnackbarAlert'
import { useDebounceFn } from 'ahooks'
import { useUserInfo } from '@/swr/useUserInfo'
import { LoadingButton } from '@mui/lab'

export interface IUpdateUserInputs {
  username: string
}

const schema = yup.object().shape({
  ...usernameSchema,
})

export const ProfileSetting = observer(() => {
  const [store] = useState(() => authStore)
  const { control, handleSubmit, formState: { dirtyFields } } = useForm<IUpdateUserInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: store.user.username,
    },
    mode: 'all',
  })

  const [loading, setLoading] = useState(false)
  const mutate = useMutation(updateUserInfoMutation)
  const { invalidateData } = useUserInfo()

  const { run: onSubmit } = useDebounceFn((data: IUpdateUserInputs) => {
    const dirtyFieldsKeys = Object.keys(dirtyFields)

    Object.entries(data).forEach(([key, _]) => {
      if (!dirtyFieldsKeys.includes(key)) {
        Reflect.deleteProperty(data, key)
      }
    })

    if (!Object.keys(data).length) {
      WarningAlert({
        msg: '你还没有更改内容哦',
      })
      return
    }

    setLoading(true)
    mutate.mutate(data, {
      async onSuccess() {
        await invalidateData()
        SuccessAlert({
          msg: '更改信息成功',
        })
        setLoading(false)
      },
      onError() {
        setLoading(false)
      },
    })
  }, { wait: 200 })

  return (
    <Card className={'p5 grid gap3'}>
      <div className={'grid gap2'}>
        <InputFiled<IUpdateUserInputs>
          control={control}
          name={'username'}
          label={'用户名'}
        />
      </div>
      <LoadingButton
        variant={'contained'}
        onClick={handleSubmit(onSubmit)}
        loading={loading}
      >
        保存修改
      </LoadingButton>
    </Card>
  )
})
