import { Box, Typography } from '@mui/material'

interface IDashboardFuturesSmallBlok {
  title: string
  number: string
}

const DashboardFuturesSmallBlok = ({ title, number }: IDashboardFuturesSmallBlok) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2D3546',
          borderRadius: '5px',
          width: '106px',
          height: '29.39px'
        }}
      >
        {title}
      </Box>
      <Box>
        <Typography>{number}</Typography>
      </Box>
    </Box>
  )
}
export default DashboardFuturesSmallBlok
