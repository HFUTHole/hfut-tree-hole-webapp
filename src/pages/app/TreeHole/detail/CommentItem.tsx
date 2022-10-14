import type { SxProps } from '@mui/material'
import {
  Avatar,
  Button,
  DialogTitle,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import type { CustomThemeOptions } from '@/theme/overrides'
import { formatTime } from '@/shared/utils/time'
import type { ICommentsItem } from '@/service/types/treehole/list'
import { useMutation } from 'react-query'
import { removeHoleCommentMutation } from '@/service/api/treehole'
import { useHoleDetail } from '@/swr/useHoleDetail'
import { ConfirmDialog } from '@/components/DialogConfirm'
import parse from 'html-react-parser'

interface Props {
  data: ICommentsItem
  isReply?: boolean
}

const spacing = 3

const CommentItemRightButton = ({ data }: { data: ICommentsItem }) => {
  const mutation = useMutation(removeHoleCommentMutation)
  const { id, setQueryData } = useHoleDetail()

  const [open, setOpen] = useState(false)

  const handleConfirmClick = () => {
    if (data.isOwner) {
      mutation.mutate({ id, commentId: data._id }, {
        onSuccess() {
          setQueryData((oldData) => {
            oldData = oldData!
            const idx = oldData.comments.findIndex(item => item._id === data._id)
            oldData.comments.splice(idx, 1)

            return oldData
          })
        },
      })
    } else {
      // TODO 完成举报
    }
  }

  return (
    <>
      <ConfirmDialog
        confirmText={data.isOwner ? '删除' : '举报'}
        confirm={'error'}
        handleConfirm={handleConfirmClick}
        open={open}
        onClose={() => setOpen(false)}
        render={<DialogTitle>确定要删除这个评论吗?</DialogTitle>}
      />
      <Button size="small" onClick={() => setOpen(true)} sx={{ position: 'absolute', right: 0, color: 'error.main' }}>
        {data.isOwner ? '删除' : '举报'}
      </Button>
    </>

  )
}

export function TreeholeBlogCommentItem({ data, isReply = false }: Props) {
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
        <ListItemAvatar className="grid gap1 text-center">
          <Avatar src={'/'} className={`${isReply ? '!wh34' : ''}`} />
          <Typography className="!text-sm" variant="subtitle2">{data.isOwner ? '洞主' : data.user.username}</Typography>
        </ListItemAvatar>

        <div className={'grid'}>
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
          <Typography component="div" variant="subtitle2" className={'whitespace-pre-wrap'}>
            {data.content}
          </Typography>
        </div>
       <CommentItemRightButton data={data}/>
      </ListItem>
      <Divider
        sx={{
          ml: 'auto',
          width: theme => `calc(100% - ${theme.spacing(7)})`,
        }}
      />

      {/* <AnimatePresence> */}
      {/*  {openReply && ( */}
      {/*    <BasicMotion> */}
      {/*      <Box */}
      {/*        sx={{ */}
      {/*          mb: 3, */}
      {/*          ml: 'auto', */}
      {/*          width: theme => `calc(100% - ${theme.spacing(7)})`, */}
      {/*        }} */}
      {/*      > */}
      {/*        <TextField */}
      {/*          fullWidth */}
      {/*          size="small" */}
      {/*          placeholder="回复ta" */}
      {/*          sx={ */}
      {/*            { */}
      {/*              '& fieldset': { */}
      {/*                borderWidth: '1px !important', */}
      {/*                borderColor: (theme: CustomThemeOptions) => `${theme.palette.grey[500_32]} !important`, */}
      {/*              }, */}
      {/*            } as SxProps */}
      {/*          } */}
      {/*        /> */}
      {/*        <div className={'mt1 flex j-end'}> */}
      {/*          <Button variant="contained">回复</Button> */}
      {/*        </div> */}
      {/*      </Box> */}

      {/*    </BasicMotion> */}
      {/*  )} */}

      {/* </AnimatePresence> */}

    </>
  )
}

