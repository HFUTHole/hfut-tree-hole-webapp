import { Box, Card, Divider, Stack, Typography } from '@mui/material'
import { SummaryChart } from '@/components/chart/SummaryChart'
import type { CustomThemeOptions } from '@/theme/overrides'
import { useTheme } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'

function ProfileFollowInfo() {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">1111</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            树洞的赞
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">2222</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            发布树洞
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

const ProfileDataInfo = observer(() => {
  const theme = useTheme() as CustomThemeOptions
  const [store] = useState(() => authStore)

  return <>
    <SummaryChart
      title="树洞浏览信息"
      percent={2.6}
      total={765}
      chartColor={theme.palette.primary.main}
      chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
    />
  </>
})

export function ProfileTree() {
  return <>
    <Box className={'grid gap5'}>
      <ProfileFollowInfo />
      <ProfileDataInfo />
    </Box>
  </>
}
