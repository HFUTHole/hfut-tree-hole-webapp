import { Helmet } from 'react-helmet'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

type Props = {
  children: ReactNode
  title: string
  meta?: ReactNode
} & Partial<BoxProps>

const Page = forwardRef(({ children, title = '', meta, ...other }: Props, ref) => {
  document.title = `${title} | HFUTHole`

  return <>
    <Helmet>
      <title>{title}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
})

export default Page
