import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ICONS } from '@/shared/constant/icons'
import { IconButton } from '@/components/IconButton'
import { InputFiled } from '@/components/form/InputFiled'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDebounceFn, useMount } from 'ahooks'
import { ContainedButton } from '@/components/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTip } from '@/shared/hooks/use-tip'

enum FieldArrayAction {
  append,
  remove,
}

const formSchema = {
  value: yup.string().required('选项不能为空哦'),
}

const schema = yup.object().shape({
  vote: yup.array().of(yup.object().shape(formSchema))
    .min(2, '投票至少要有两个选项'),
})

export const CreateTreeholeVote = () => {
  const [open, setOpen] = useState(true)
  const { errorTip } = useTip()

  const {
    control,
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vote',
  })

  const appendField = () => {
    fields.length !== 5 && append(' 1')
  }

  const onFieldIconClick = (index: number, type: FieldArrayAction) => {
    if (type === FieldArrayAction.append) {
      append({ value: '' }, {
        focusIndex: fields.length - 1,
      })
    } else if (index >= 1) {
      remove(index)
    }
  }

  useMount(() => {
    appendField()
  })

  const { run: onSubmit } = useDebounceFn((data) => {
    console.log(data)
  }, { wait: 200 })

  const onError = (err) => {
    errorTip('请确保自己填完了哦')
  }

  return (
    <div>
      <IconButton icon={ICONS.vote} onClick={() => setOpen(true)}/>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
        <DialogTitle>创建投票(最多只能有5项)</DialogTitle>
        <DialogContent>
          <div className={'p5 grid gap3'}>
            {fields.map((field, index) => {
              const type = ((index + 1 === fields.length && fields.length !== 5)) ? FieldArrayAction.append : FieldArrayAction.remove

              return (
                <InputFiled
                  key={field.id}
                  control={control}
                  fullWidth
                  name={`vote.${index}.value`}
                  label={`选项${index + 1}`}
                  rightIcon={type === FieldArrayAction.append ? <i className={ICONS.add}/> : <i className={ICONS.close}/>}
                  onIconClick={() => onFieldIconClick(index, type)}
                />
              )
            })}
          </div>
        </DialogContent>
        <DialogActions className={'!pt0'}>
          <ContainedButton onClick={handleSubmit(onSubmit, onError)}>创建投票</ContainedButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
