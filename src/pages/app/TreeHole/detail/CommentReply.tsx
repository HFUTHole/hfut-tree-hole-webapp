import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import { UserAvatar } from '@/components/UserAvatar'
import type { SxProps } from '@mui/material'
import { Box } from '@mui/material'
import type { CustomThemeOptions } from '@/theme/overrides'

export function TreeholeReplyList({ data }: { data: ITreeholeDetailData['comments'] }) {
  return <>
    <Box
      className={'bg-[#161C24]/25 ml-auto p2 rounded-lg'}
      sx={{
        width: (theme: CustomThemeOptions) => `calc(100% - ${theme.spacing(5)})`,
      } as SxProps}
    >
      <div>
        <UserAvatar className={'!wh25'}/>
      </div>
    </Box>
  </>
}
