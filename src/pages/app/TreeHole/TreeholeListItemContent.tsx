import { ICONS } from '@/shared/constant/icons'
import { Box, IconButton, Typography } from '@mui/material'
import { Image } from '@/components/Image'

export const TreeholeListItemBottomIcons: FC<{
  data: ITreeHoleListDataItem
}> = ({ data }) => {
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

export const TreeholeListItemContent: FC<{
  content: ITreeHoleListDataItem | ITreeholeDetailData
}> = ({ content }) => {
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
