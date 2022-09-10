import { Card } from '@mui/material'
import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeListRequest } from '@/service/api/treehole'
import { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'
import { observer } from 'mobx-react-lite'
import { AnimatePresence } from 'framer-motion'
import { AlertTip } from '@/components/SnackbarAlert'
import { Link } from 'react-router-dom'
import { BasicMotion } from '@/components/animate/basic-motion'
import { TreeholeListItem, TreeholeListItemBottomIcons } from '@/pages/app/TreeHole/TreeholeListItem'
import { HoleEmpty } from '@/pages/app/TreeHole/HoleEmpty'

export const TreeholeList = observer(() => {
  const [store] = useState(() => treeholeListModeStore)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)

  const { isSuccess, data, isFetching, isError } = useQuery(
    [queryKey.treehole.list, store.mode, skip, limit],
    () => getTreeholeListRequest(store.mode, skip, limit),
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
      keepPreviousData: true,
    },
  )

  return (
    <>
      {
        isSuccess
        && data.data!.length === 0
        && <HoleEmpty />
      }
      <AnimatePresence exitBeforeEnter>
        {isSuccess
          && !isFetching
          && data.data!.map(item => (
            <BasicMotion key={item.id}>
              <Link to={`detail/${item.id}`}>
                <Card className={'px5 py3'}>
                  <TreeholeListItem data={item} />
                  <TreeholeListItemBottomIcons data={item} />
                </Card>
              </Link>
            </BasicMotion>
          ))}
      </AnimatePresence>
      <AnimatePresence>
        {(isFetching || isError)
          && Array.from({ length: 3 }).map((_, index) => (
            <BasicMotion key={index}>
              <SkeletonPostCard />
            </BasicMotion>
          ))}
      </AnimatePresence>
    </>
  )
})
