import type { SxProps } from '@mui/material'
import { Box, Button, Card, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { SummaryChart } from '@/components/chart/SummaryChart'
import type { CustomThemeOptions } from '@/theme/overrides'
import { useTheme } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'

const ProfileFollowInfo = observer(() => {
  const [store] = useState(() => authStore)

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{store.userData.stars}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            点赞的树洞
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{store.userData.holesPostNum}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            发布的树洞
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
})

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

function ProfilePostInput() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAttach = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          '& fieldset': {
            borderWidth: '1px !important',
            borderColor: (theme: CustomThemeOptions) => `${theme.palette.grey[500_32]} !important`,
          },
        } as SxProps}
      />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
            <i className={'i-ic:round-add-photo-alternate wh24'}/>
          </IconButton>
          <IconButton size="small" onClick={handleAttach}>
            <i className={'i-eva:attach-2-fill wh24'} />
          </IconButton>
        </Box>
        <Button variant="contained">Post</Button>
      </Box>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  )
}

export function ProfileTree() {
  return <>
    <Box className={'grid gap5'}>
      <ProfileFollowInfo />
      <ProfileDataInfo />
      <ProfilePostInput />
    </Box>
  </>
}
