import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
import { alpha, styled } from '@mui/material/styles'
import { Box, Card, Stack, Typography } from '@mui/material'
import { BaseOptionChart } from '@/components/chart/baseOptionChart'
import { fNumber, fPercent } from '@/shared/utils/numeral'
import type { ApexOptions } from 'apexcharts'

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}))

interface ISummaryChartProps {
  title: string
  percent: number
  total: number
  chartColor: string
  chartData: number[]
}

export function SummaryChart({ title, percent, total, chartColor, chartData }: ISummaryChartProps) {
  const chartOptions = merge(BaseOptionChart(), {
    colors: [chartColor],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
  }) as ApexOptions

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(total)}
        </Typography>

        <Stack direction="row" alignItems="center">
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: theme => alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <i className={`wh16 ${percent >= 0 ? 'i-eva:trending-up-fill' : 'i-eva:trending-down-fill'}`} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
          <Typography variant="body2" component="span" noWrap sx={{ color: 'text.secondary' }}>
            &nbsp;相较于昨天
          </Typography>
        </Stack>
      </Box>

      <ReactApexChart type="line" series={[{ data: chartData }]} options={chartOptions} width={120} height={80} />
    </Card>
  )
}
