import { Box } from '@mui/material'
import DashboardBloksHeader from '../../../../shared/components/dashboardBloksHeader'
import ColumnGroupingTable from './dashboardHoldingsTable'

const DashboardHoldings = () => {
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
        maxWidth: '1391px',
        width: '100%',
        height: '348px'
      }}
    >
      <DashboardBloksHeader blokTitle={'Holdings'} />
      <ColumnGroupingTable />
    </Box>
  )
}
export default DashboardHoldings
