import { Box,  } from '@mui/material'
import DashboardBloksHeader from '../../../../shared/components/dashboardBloksHeader'
import DashoardAnaliticsBlock from './dashoardAnaliticsBlock'

const analyticsBlockIcon = '/analyticsBlockIcon.svg'

const DashoardAnalitics = () => {
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
        maxWidth: '478px',
        width: '100%',
        height: '348px'
      }}
    >
      <DashboardBloksHeader blokTitle={'Analytics'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '12px'
          }}
        >
          <DashoardAnaliticsBlock title={'Total Trade Pair'} currency={'BTC/USDT'} img={analyticsBlockIcon} />
          <DashoardAnaliticsBlock title={'Total Trade Pair'} currency={'BTC/USDT'} img={analyticsBlockIcon} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '12px'
          }}
        >
          <DashoardAnaliticsBlock title={'Total Trade Pair'} currency={'BTC/USDT'} img={analyticsBlockIcon} />
          <DashoardAnaliticsBlock title={'Total Trade Pair'} currency={'BTC/USDT'} img={analyticsBlockIcon} />
        </Box>
      </Box>
    </Box>
  )
}

export default DashoardAnalitics
