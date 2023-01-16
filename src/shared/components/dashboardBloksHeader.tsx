import { Box, Typography } from '@mui/material'

interface IDashboardBloksHeader {
  blokTitle: string
}

const DashboardBloksHeader = ({ blokTitle }: IDashboardBloksHeader) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      }}
    >
      <Typography>{blokTitle}</Typography>
      <Typography>See more</Typography>
    </Box>
  )
}

export default DashboardBloksHeader
