import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Collapse, List } from '@mui/material'
import { NavItemRoot, NavItemSub } from './NavItem'
import { getActive } from '@/layouts/dashboard/navbar/utils'
import type { NavListConfig } from '@/layouts/dashboard/navbar/navListConfig'

export function NavListRoot({ list }: { list: typeof NavListConfig }) {
  const { pathname } = useLocation()

  const active = getActive(list.path, pathname)

  const [open, setOpen] = useState(active)

  const hasChildren = list.children

  if (hasChildren) {
    return <>
        <NavItemRoot item={list} active={active} open={open} onOpen={() => setOpen(!open)} />
    </>
  }

  return <NavItemRoot item={list} active={active} />
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
