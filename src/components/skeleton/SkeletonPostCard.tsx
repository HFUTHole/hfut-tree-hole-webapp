import { Box, Card, Grid, Skeleton } from '@mui/material'

export function SkeletonPostCard() {
  return (
      <Card className={'grid gap2 p3'}>
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }}/>
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }}/>
        </Box>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }}/>
      </Card>
  )
}
