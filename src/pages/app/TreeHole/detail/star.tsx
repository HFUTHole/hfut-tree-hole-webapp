import { useTheme } from '@mui/material/styles'
import type { CustomThemeOptions } from '@/theme/overrides'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import type { Method } from 'axios'
import { holeStarMutation } from '@/service/api/treehole'
import { useHoleDetail } from '@/swr/useHoleDetail'
import { useDebounceFn } from 'ahooks'
import { IconButton, Typography } from '@mui/material'
import { Icon } from '@/components/Icon'
import { ICONS } from '@/shared/constant/icons'

export function TreeholeStarIcons({ data }: { data: ITreeholeDetailData }) {
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
