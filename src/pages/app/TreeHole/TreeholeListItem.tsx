import type { ITreeHoleListData } from '@/service/types/treehole/list'
import { Box, IconButton, Typography } from '@mui/material'
import { Image } from '@/components/Image'
import { UserAvatar } from '@/components/UserAvatar'
import { ICONS } from '@/shared/constant/icons'
import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import { formatTime } from '@/shared/utils/time'

export const TreeholeListItemBottomIcons = ({ data }: { data: ITreeHoleListData }) => {
  const contentIcons = [
    { icon: ICONS.stars, value: data.stars || 1 },
    { icon: ICONS.reply, value: data.comments.length },
  ]

  return (
    <Box className={'flex gap2'}>
      {contentIcons.map(item => (
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
  )
}

export const TreeholeListItemContent = ({ content }: { content: ITreeHoleListData | ITreeholeDetailData }) => {
  return (
    <>
      <Box className={'grid gap3 py3'}>
        <Typography variant={'subtitle2'} className={'whitespace-pre-wrap'}>
          {content.content}
        </Typography>
        {content.imgs?.length > 0 && (
          <Box className={'w-full flex gap1 flex-wrap rounded-md overflow-hidden'}>
            {content.imgs.map(item => (
              <Image key={item} className={'flex1 max-h-64 object-cover'} src={item} />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}

export function TreeholeListItem({ data }: { data: ITreeHoleListData | ITreeholeDetailData }) {
  return (
    <div className={'grid gap2'}>
      <Box className={'y-center gap3'}>
        <UserAvatar />
        <Box className={'grid'}>
          <Typography variant={'subtitle2'}>#{data.id}</Typography>
          <p className={'light:text-black/45 dark:text-white/85 !text-xs'}>{formatTime(data.createTime)}</p>
        </Box>
      </Box>
      <TreeholeListItemContent content={data} />
    </div>
  )
}
