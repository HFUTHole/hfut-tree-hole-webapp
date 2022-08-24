import isString from 'lodash/isString'
import { Box, Link, Typography } from '@mui/material'
import Breadcrumbs from './Breadcrumbs'

export const HeaderBreadcrumbs = ({ links, action, heading, moreLink = '' || [], sx, ...other }) => {
  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink)
          ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
            )
          : (
              moreLink.map(href => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
              ))
            )}
      </Box>
    </Box>
  )
}
