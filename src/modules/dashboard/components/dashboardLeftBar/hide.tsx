import { Box, Typography } from '@mui/material'
import Image from 'next/image'

const hideIcon = '/hide-icon.svg'

const HideComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1A202C',
        border: '1px solid #2B3548',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '7px',
        height: '40px'
      }}
    >
      <Typography>Hide small balances</Typography>
      <Image src={hideIcon} alt='hideIcon' />
    </Box>
  )
}

export default HideComponent
