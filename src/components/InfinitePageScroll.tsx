import type { InfiniteScrollProps } from 'react-infinite-scroller'
import { LoadMore } from '@/components/LoadMore'
import type { ReactNode } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

type Props = {
  children: ReactNode
  noMoreContent: ReactNode
} & InfiniteScrollProps

export const InfinitePageScroll: FC<Props> = ({
  children,
  noMoreContent,
  ...infiniteOptions
}) => {
  return (
    <div>
      <InfiniteScroll
        {...infiniteOptions}
        loader={<LoadMore />}
      >
        {children}
      </InfiniteScroll>
      {!infiniteOptions.hasMore && (
        <div className={'pt2'}>{noMoreContent}</div>
      )}
    </div>
  )
}
