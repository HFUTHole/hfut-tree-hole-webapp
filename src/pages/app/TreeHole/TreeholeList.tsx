import { Card } from '@mui/material'
import { SkeletonPostCard } from '@/components/skeleton/SkeletonPostCard'
import { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'
import { observer } from 'mobx-react-lite'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BasicMotion } from '@/components/animate/basic-motion'
import { TreeholeListItem, TreeholeListItemBottomIcons } from '@/pages/app/TreeHole/TreeholeListItem'
import { HoleEmpty } from '@/pages/app/TreeHole/HoleEmpty'
import '@/pages/style.css'
import { useHoleList } from '@/swr/useHoleList'
import { Fragment } from 'react'
import { InfinitePageScroll } from '@/components/InfinitePageScroll'

export const TreeholeList = observer(() => {
  const [store] = useState(() => treeholeListModeStore)
  const [limit] = useState(10)

  const rootRef = useRef<HTMLDivElement>(null)

  const {
    isSuccess,
    data,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useHoleList(limit, store)

  return (
    <div ref={rootRef}>
      {
        isSuccess
        && data.pages!.length === 0
        && <HoleEmpty />
      }
      <AnimatePresence exitBeforeEnter>
        {
          isSuccess && !isFetching
          && (
              <InfinitePageScroll
                loadMore={fetchNextPage}
                hasMore={hasNextPage}
                className={'grid gap3'}
                noMoreContent={<div className={'text-center text-secondary text-xs'}>没有更多树洞了哦~</div>}
              >
                {data!.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group.data!.map(item => (
                      <div className={'scroll-item'} key={item.id}>
                        <BasicMotion>
                          <Link to={`detail/${item.id}`}>
                            <Card className={'px5 py3'}>
                              <TreeholeListItem data={item} />
                              <TreeholeListItemBottomIcons data={item} />
                            </Card>
                          </Link>
                        </BasicMotion>
                      </div>))}
                  </Fragment>
                ))}
              </InfinitePageScroll>
          )
        }
      </AnimatePresence>
      <AnimatePresence>
        {(isFetching || isError)
          && Array.from({ length: 3 }).map((_, index) => (
            <BasicMotion key={index}>
              <SkeletonPostCard />
            </BasicMotion>
          ))}
      </AnimatePresence>
    </div>
  )
})
