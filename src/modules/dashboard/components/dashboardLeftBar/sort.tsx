import { Box, Typography } from '@mui/material'
import Image from 'next/image'

const sortIcon = '/sort-icon.svg'

const SortComponent = () => {
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
        maxWidth: '196px',
        width: '100%',
        height: '40px'
      }}
    >
      <Typography>Sort</Typography>
      <Image src={sortIcon} alt='sortIcon' />
    </Box>
  )
}

export default SortComponent
