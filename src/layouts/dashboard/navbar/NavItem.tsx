import { NavLink as RouterLink, useLocation } from 'react-router-dom'
import { Box, Collapse, List, ListItemText, useTheme } from '@mui/material'
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from './style'
import type { CustomThemeOptions } from '@/theme/overrides'
import type { TNavListConfig, TNavListItem } from '@/layouts/dashboard/navbar/navListConfig'
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

function NavListSub({ list }: { list: any }) {
  const { pathname } = useLocation()

  const active = getActive(list.path, pathname)

  const [open, setOpen] = useState(active)

  const hasChildren = list.children

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map(item => (
              <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname)} />
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  return <NavItemSub item={list} active={active} />
}

interface NavItemRootProps {
  item: TNavListConfig
  open: boolean
  active: boolean
}

const onOpen = () => {}

export function NavItemRoot({ item, open = false, active }: NavItemRootProps) {

}

export function NavItemSub({ item, open = false, active = false, onOpen }) {
  const { title, path, info, children } = item

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  )

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem activeRoot={false}>
        {renderContent}
      </ListItemStyle>
    )
  }

  return <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
    {renderContent}
  </ListItemStyle>
}

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: theme =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  )
}

export function ArrowIcon({ open }: { open: boolean }) {
  return <i className={open ? 'i-eva:arrow-ios-downward-fill' : 'i-eva:arrow-ios-forward-fill'}/>
}
