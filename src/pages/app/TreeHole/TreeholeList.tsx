import { Box, Card, IconButton, Typography } from '@mui/material'
import { UserAvatar } from '@/components/UserAvatar'
import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import type { ITreeHoleListData } from '@/service/types/treehole/list'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeListRequest } from '@/service/api/treehole'
import { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'
import { observer } from 'mobx-react-lite'
import { AnimatePresence } from 'framer-motion'
import { Image } from '@/components/Image'
import { AlertTip } from '@/components/SnackbarAlert'
import { Link } from 'react-router-dom'
import { BasicMotion } from '@/components/animate/basic-motion'

const TreeholeListContent = ({ content }: { content: ITreeHoleListData }) => {
  const contentIcons = [
    { icon: 'i-ic:twotone-star-outline', value: content.stars },
    { icon: 'i-uil:comment-dots', value: content.commentsNum },
  ]

  return (
    <>
      <Box className={'grid gap3'}>
        <Typography variant={'subtitle2'} className={'whitespace-pre-wrap'}>
          {content.content}
        </Typography>
        {content.imgs?.length > 0 && (
          <Box className={'w-full flex gap1 flex-wrap rounded-md overflow-hidden'}>
            {content.imgs.map((item) => (
              <Image key={item} className={'flex1 max-h-64 object-cover'} src={item} />
            ))}
          </Box>
        )}
        <Box className={'flex gap2'}>
          {contentIcons.map((item) => (
            <Box
              className={'y-center text-xs'}
              key={item.icon}
              sx={{
                color: 'text.disabled',
              }}
            >
              <IconButton size={'small'}>
                <i className={`!text-lg ${item.icon} flex1`} />
              </IconButton>
              <p>{item.value}</p>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export function TreeholeListCard({ data }: { data: ITreeHoleListData }) {
  return (
    <div className={'grid gap2'}>
      <Box className={'y-center gap3'}>
        <UserAvatar />
        <Box className={'grid'}>
          <Typography variant={'subtitle2'}>#{data.id}</Typography>
          <p className={'light:text-black/45 dark:text-white/85 !text-xs'}>{data.createTime}</p>
        </Box>
      </Box>
      <TreeholeListContent content={data} />
    </div>
  )
}

export const TreeholeList = observer(() => {
  const [store] = useState(() => treeholeListModeStore)

  const { isSuccess, data, isFetching, isError } = useQuery(
    [queryKey.treehole.list, store.mode],
    () => getTreeholeListRequest(store.mode),
    {
      onError: () => {
        AlertTip({
          alertProps: {
            severity: 'error',
          },
          title: '获取树洞列表失败',
          msg: '可能是网络的原因，请稍后再试',
        })
      },
    }
  )

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {isSuccess &&
          !isFetching &&
          data!.map((item) => (
            <BasicMotion key={item.id}>
              <Link to={`detail/${item.id}`}>
                <Card className={'px5 py3'}>
                  <TreeholeListCard data={item} />
                </Card>
              </Link>
            </BasicMotion>
          ))}
      </AnimatePresence>
      <AnimatePresence>
        {(isFetching || isError) &&
          Array.from({ length: 3 }).map((_, index) => (
            <BasicMotion key={index}>
              <SkeletonPostCard />
            </BasicMotion>
          ))}
      </AnimatePresence>
    </>
  )
})
