import { Box, Typography } from '@mui/material'
import Image from 'next/image'

const analyticsBlockIcon = '../../assets/analyticsBlockIcon.svg'
const chartIcon = '/chart-icon.svg'
const editeIcon = '/edite-icon.svg'
const deleteIcon = '/delete-icon.svg'

const dashboardLeftBarRow = () => {
  return (
    <Box>
      <Box>
        <Image src={analyticsBlockIcon} alt='analyticsBlockIcon' />
        <Typography>Metamask</Typography>
      </Box>
      <Box>
        <Typography>4.85%</Typography>

        <Image src={chartIcon} alt='chartIcon' />
      </Box>
      <Box></Box>
      <Image src={editeIcon} alt='editeIcon' />
      <Image src={deleteIcon} alt='deleteIcon' />
    </Box>
  )
}

export default dashboardLeftBarRow
