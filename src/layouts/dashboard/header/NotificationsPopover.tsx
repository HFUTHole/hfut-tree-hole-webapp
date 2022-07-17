import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from '@mui/material'
import { Scrollbar } from '@/components/Scrollbar'
import { useImmer } from 'use-immer'
import { HeaderPopover } from '@/layouts/dashboard/header/HeaderPopover'
import { UserAvatar } from '@/components/UserAvatar'
import { isEmptyArray } from '@/shared/utils/is'

const _notifications = [
  { isUnread: true, id: 1, title: 'title', avatar: <UserAvatar /> },
  { isUnread: false, id: 2, title: 'title2', avatar: <UserAvatar /> },
]

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useImmer(_notifications)

  const notificationDetail = useMemo(() => {
    if (isEmptyArray(notifications)) {
      return {}
    }

    const unread = notifications.filter(item => item.isUnread)
    const unreadLength = unread.length
    const alreadyRead = notifications.filter(item => !item.isUnread)

    return {
      unread,
      unreadLength,
      alreadyRead,
    }
  }, [notifications])

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        isUnRead: false,
      })),
    )
  }

  const iconButtonChildren = (
    <Badge badgeContent={notificationDetail.unreadLength} color="error">
      <i className={'i-eva:bell-fill wh20'} />
    </Badge>
  )

  return (
    <>
      <HeaderPopover
        iconButtonChildren={iconButtonChildren}
        iconButtonProps={{
          sx: { width: 40, height: 40 },
        }}
        menuProps={{
          sx: { width: 360, p: 0, mt: 1.5, ml: 0.75 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {notificationDetail.unreadLength} unread messages
            </Typography>
          </Box>

          {
            notificationDetail.unreadLength && (
              <Tooltip title="Mark all as read">
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <i className="i-eva:done-all-fill wh20" />
                </IconButton>
              </Tooltip>
            )
          }
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notificationDetail.unread.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notificationDetail.alreadyRead.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </HeaderPopover>
    </>
  )
}

function NotificationItem({ notification }: { notification: any }) {
  const { avatar, title } = notification

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnread && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <i
              className={'i-eva:clock-outline mr-[0.5px] wh16'}
            />
            test
          </Typography>
        }
      />
    </ListItemButton>
  )
}

