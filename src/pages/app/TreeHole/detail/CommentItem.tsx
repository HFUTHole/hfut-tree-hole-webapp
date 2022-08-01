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
import { BasicMotion } from '@/components/animate/basic-motion'
import { AnimatePresence } from 'framer-motion'

interface Props {
  data: ITreeholeDetailDataComment | ITreeholeDetailDataReply
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
        <ListItemAvatar>
          <Avatar src={'/'} className={`${isReply ? '!wh34' : ''}`} />
        </ListItemAvatar>

        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <p className={'font-semibold'}>{data.username}</p>
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
              <Typography component="span" variant="subtitle2">
                <strong>{data.content}</strong>
              </Typography>
            </>
          }
        />
        <Button size="small" onClick={handleOpenReply} sx={{ position: 'absolute', right: 0 }}>
          回复
        </Button>
      </ListItem>

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

      {}
    </>
  )
}
