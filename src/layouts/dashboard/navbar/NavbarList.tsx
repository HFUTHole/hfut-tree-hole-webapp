import type { BoxProps } from '@mui/material'
import { Box, List, ListSubheader } from '@mui/material'
import { NavListConfig } from '@/layouts/dashboard/navbar/navListConfig'
import { styled } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { NavListRoot } from './NavList'

export const ListSubheaderStyle = styled(({ children }: { children: ReactNode }) => (
  // 规避类型报错
  // eslint-disable-next-line react/no-children-prop
  <ListSubheader disableSticky disableGutters children={children}/>
))(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  }),
)

export function NavbarList(props: BoxProps) {
  return <>
    <Box {...props}>
      {NavListConfig.map(group => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.list.map(list => (
            <NavListRoot key={list.title} list={list} />
          ))}
        </List>
      ))}
    </Box>
  </>
}
