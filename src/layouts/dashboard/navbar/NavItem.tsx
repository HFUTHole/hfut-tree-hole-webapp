import PropTypes from 'prop-types'
import { NavLink as RouterLink } from 'react-router-dom'
import { Box, Link, ListItemText, useTheme } from '@mui/material'
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from './style'
import type { CustomThemeOptions } from '@/theme/overrides'

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  isCollapse: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
}

export function NavItemRoot({ item, open = false, active, onOpen }) {
  const { title, path, icon, info, children } = item

  const theme = useTheme() as CustomThemeOptions

  const color = theme.palette.primary.main

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>
        <i className={'i-carbon:tree text-xl text-[#00AB55]'}/>
      </ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={title} />
      {/* {!isCollapse && ( */}
      {/*  <> */}
      {/*    {info && info} */}
      {/*    {children && <ArrowIcon open={open} />} */}
      {/*  </> */}
      {/* )} */}
    </>
  )

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={true} theme={theme}>
        {renderContent}
      </ListItemStyle>
    )
  }

  return <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
    {renderContent}
  </ListItemStyle>
}

// ----------------------------------------------------------------------

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
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
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    )
  }

  return <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
    {renderContent}
  </ListItemStyle>
}

// ----------------------------------------------------------------------

DotIcon.propTypes = {
  active: PropTypes.bool,
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
