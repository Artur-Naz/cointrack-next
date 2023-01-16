import { Box } from '@mui/material'
import HideComponent from './hide'
import SearchComponent from './search'
import SortComponent from './sort'

const DashboardLeftBar = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        background: '#212734',
        maxWidth: '405px',
        width: '100%',
        height: '678px'
      }}
    >
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '7px',
            justifyContent: 'space-between'
          }}
        >
          <HideComponent />
          <SortComponent />
        </Box>
        <Box>
          <SearchComponent />
        </Box>
      </Box>

      <Box></Box>
    </Box>
  )
}

export default DashboardLeftBar
