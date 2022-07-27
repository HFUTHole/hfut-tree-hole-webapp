import { useTreehole } from '@/pages/app/TreeHole/utils'
import { Box, Card, Typography } from '@mui/material'
import { UserAvatar } from '@/components/UserAvatar'
import testImg from '@/assets/imgs/treehole.jpg'

const TreeholeListContent = ({ content }: { content: any }) => {
  return <>
    <Box className={'grid gap2'}>
      <Typography variant={'subtitle2'} className={'whitespace-pre-wrap'}>
        {content.desc}
      </Typography>
      {content.imgs.length > 0 && <Box className={'w-full flex gap1 flex-wrap rounded-md overflow-hidden'}>
        {content.imgs.map(item => <img key={item} className={'flex1 max-h-64 object-cover'} src={item}/>)}
      </Box>}
    </Box>
  </>
}

export const TreeholeList = () => {
  const { listData } = useTreehole()

  return <>
    <div className={'grid gap2 w-full'}>
      {listData!.map(item => (
        <Card className={'grid gap2 p3'} key={item.id}>
          <Box className={'y-center gap3'}>
            <UserAvatar />
            <Box className={'grid'}>
              <Typography variant={'subtitle2'}>#{item.id}</Typography>
              <p className={'light:text-black/45 dark:text-white/85 !text-xs'}>{item.createTime}</p>
            </Box>
          </Box>
          <TreeholeListContent content={item}/>
        </Card>
      ))}
    </div>
  </>
}

