import { alpha, styled } from '@mui/material/styles'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NAVBAR } from '@/shared/constant/ui'
import type { CustomThemeOptions } from '@/theme/overrides'
import type { NavLinkProps } from 'react-router-dom'

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: prop => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem',
})(({ activeRoot, theme }: { activeRoot: boolean; theme?: CustomThemeOptions; component: any } & Partial<NavLinkProps>) => {
  theme = theme!
  return {
    ...theme.typography.body2,
    position: 'relative',
    height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    }),
  }
})

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: prop => prop !== 'isCollapse',
})(({ theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
}))

export const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
})
