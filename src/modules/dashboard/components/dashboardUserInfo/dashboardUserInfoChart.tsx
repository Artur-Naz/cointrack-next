import { Box } from '@mui/material'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const DashboardUserInfoChart = () => {
  const data = [
    {
      date: 1671530400000,
      value: 9544.54
    },
    {
      date: 1671530400000,
      value: 9544.54
    },
    {
      date: 1671530400000,
      value: 9544.54
    },
    {
      date: 1671530400000,
      value: 9544.54
    },
    {
      date: 1671530400000,
      value: 9544.54
    },
    {
      date: 1671530400000,
      value: 9544.54
    },
    {
      date: 1671530400000,
      value: 9544.54
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        height: '119.68px'
      }}
    >
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart
          width={730}
          height={250}
          data={data}
          margin={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
          }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1' rotate={'180deg'}>
              <stop offset='0%' stopColor='rgba(147, 126, 193, 0.6)' stopOpacity={1} />
              <stop offset='100%' stopColor='rgba(147, 126, 193, 0)' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' hide />
          <YAxis hide domain={['0', 'auto']} />
          <Bar dataKey='value' barSize={'1h' === '1h' ? 33 : 1} fill='url(#colorUv)' radius={5} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default DashboardUserInfoChart
