import { NavLink as RouterLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from './style'
import type { CustomThemeOptions } from '@/theme/overrides'
import type { TNavListItem } from '@/layouts/dashboard/navbar/navListConfig'
import { getActive } from '@/layouts/dashboard/navbar/utils'

export function NavListItemRoot({ item }: { item: TNavListItem }) {
  const { title, path, icon } = item

  const { pathname } = useLocation()
  const theme = useTheme() as CustomThemeOptions

  const active = getActive(item.path, pathname)
  const color = theme.palette.primary.main

  return <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
    {icon && (
      <ListItemIconStyle>
        <i className={`${item.icon} text-xl`} style={{ ...(active && { color }) }}/>
      </ListItemIconStyle>)
    }
    <ListItemTextStyle disableTypography primary={title} />
  </ListItemStyle>
}

