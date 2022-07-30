import type { SxProps } from '@mui/material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import type { ITreeholeDetailDataComment, ITreeholeDetailDataReply } from '@/service/types/treehole/detail'
import type { CustomThemeOptions } from '@/theme/overrides'

export function TreeholeBlogCommentItem({ data }: { data: ITreeholeDetailDataComment | ITreeholeDetailDataReply }) {
  const [openReply, setOpenReply] = useState(false)

  const hasReply = data.reply && data.reply.length > 0

  const handleOpenReply = () => {
    setOpenReply(true)
  }

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar src={'/'} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {data.createTime}
              </Typography>
              <Typography component="span" variant="body2">
                <strong>{data.content}</strong>
              </Typography>
            </>
          }
        />

        {!hasReply && (
          <Button size="small" onClick={handleOpenReply} sx={{ position: 'absolute', right: 0 }}>
            回复
          </Button>
        )}
      </ListItem>

      {!hasReply && openReply && (
        <Box
          sx={{
            mb: 3,
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Write comment"
            sx={
              {
                '& fieldset': {
                  borderWidth: `1px !important`,
                  borderColor: (theme: CustomThemeOptions) => `${theme.palette.grey[500_32]} !important`,
                },
              } as SxProps
            }
          />
        </Box>
      )}

      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  )
}
