import { Box, Card, Typography } from '@mui/material'
import { UserAvatar } from '@/components/UserAvatar'
import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import type { ITreeHoleListData } from '@/service/types/treehole/list'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeListRequest } from '@/service/api/treehole'
import { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'
import { observer } from 'mobx-react-lite'
import { AnimatePresence, motion } from 'framer-motion'
import { varFade } from '@/components/animate/variants'
import { Image } from '@/components/Image'

const TreeholeListContent = ({ content }: { content: ITreeHoleListData }) => {
  const contentIcons = [
    { icon: 'i-ic:twotone-star-outline', value: content.stars },
    { icon: 'i-uil:comment-dots', value: content.commentsNum },
  ]
  return <>
    <Box className={'grid gap3'}>
      <Typography variant={'subtitle2'} className={'whitespace-pre-wrap'}>
        {content.desc}
      </Typography>
      {content.imgs?.length > 0 && <Box className={'w-full flex gap1 flex-wrap rounded-md overflow-hidden'}>
        {content.imgs.map(item => <Image
          key={item}
          className={'flex1 max-h-64 object-cover'}
          src={item}
        />)}
      </Box>}
      <Box className={'flex w-full gap2'}>
        {
          contentIcons.map(item => <Box
            className={'y-center text-xs gap1'}
            key={item.icon}
            sx={{
              color: 'text.disabled',
            }}
          >
            <i className={`!text-lg ${item.icon} flex1`}/>
            <p>{item.value}</p>
          </Box>)
        }
      </Box>
    </Box>
  </>
}

export const TreeholeList = observer(() => {
  const [store] = useState(() => treeholeListModeStore)

  const { isSuccess, data, isFetching } = useQuery([queryKey.treehole.list, store.mode], () => getTreeholeListRequest(store.mode))

  return <>
    <AnimatePresence exitBeforeEnter>
      {(isSuccess && !isFetching) && data!.map(item => (
        <motion.div
          key={item.id}
          {...varFade().in}

        >
          <Card className={'grid gap2 px5 py3 hover:cursor-pointer'}>
            <Box className={'y-center gap3'}>
              <UserAvatar/>
              <Box className={'grid'}>
                <Typography variant={'subtitle2'}>#{item.id}</Typography>
                <p className={'light:text-black/45 dark:text-white/85 !text-xs'}>{item.createTime}</p>
              </Box>
            </Box>
            <TreeholeListContent content={item}/>
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
    <AnimatePresence>
      {isFetching && Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          {...varFade().in}
        >
          <SkeletonPostCard/>
        </motion.div>
      ))}
    </AnimatePresence>
  </>
})

