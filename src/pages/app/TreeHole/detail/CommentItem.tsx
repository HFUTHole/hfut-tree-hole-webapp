import type { SxProps } from '@mui/material'
import {
  Avatar,
  Box,
  Button, Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import type { CustomThemeOptions } from '@/theme/overrides'
import { BasicMotion } from '@/components/animate/basic-motion'
import { AnimatePresence } from 'framer-motion'
import { formatTime } from '@/shared/utils/time'
import type { ICommentsItem } from '@/service/types/treehole/list'

interface Props {
  data: ICommentsItem
  isReply?: boolean
}

const spacing = 3

export function TreeholeBlogCommentItem({ data, isReply = false }: Props) {
  const [openReply, setOpenReply] = useState(false)

  const handleOpenReply = () => {
    setOpenReply(prev => !prev)
  }

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          ...(isReply && {
            ml: 'auto',
            width: (theme: CustomThemeOptions) => `calc(100% - ${theme.spacing(spacing)})`,
          } as SxProps),
        }}
      >
        <ListItemAvatar className="grid gap1">
          <Avatar src={'/'} className={`${isReply ? '!wh34' : ''}`} />
          <Typography className="!text-sm" variant="subtitle2">{data.user.username}</Typography>
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
                {formatTime(data.createTime)}
              </Typography>
              <Typography component="span" variant="subtitle2">
                <strong>{data.content}</strong>
              </Typography>
            </>
          }
        />
        {/* <Button size="small" onClick={handleOpenReply} sx={{ position: 'absolute', right: 0 }}>
          回复
        </Button> */}
      </ListItem>
      <Divider
        sx={{
          ml: 'auto',
          width: theme => `calc(100% - ${theme.spacing(7)})`,
        }}
      />

      <AnimatePresence>
        {openReply && (
          <BasicMotion>
            <Box
              sx={{
                mb: 3,
                ml: 'auto',
                width: theme => `calc(100% - ${theme.spacing(7)})`,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="回复ta"
                sx={
                  {
                    '& fieldset': {
                      borderWidth: '1px !important',
                      borderColor: (theme: CustomThemeOptions) => `${theme.palette.grey[500_32]} !important`,
                    },
                  } as SxProps
                }
              />
              <div className={'mt1 flex j-end'}>
                <Button variant="contained">回复</Button>
              </div>
            </Box>

          </BasicMotion>
        )}

      </AnimatePresence>

    </>
  )
}
