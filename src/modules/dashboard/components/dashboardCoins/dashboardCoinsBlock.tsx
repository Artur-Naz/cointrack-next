import { Box } from '@mui/material'

interface IdashboardCoinsBlock {
  children?: any
  styles?: any
}

const DashboardCoinsBlock = ({ children, styles }: IdashboardCoinsBlock) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(182.87deg, #7E4DED 3.03%, #8864D7 44.5%, #805AD5 98.96%)',
        boxShadow: 'inset 0px -1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '7px',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '148%',
        ...styles
      }}
    >
      {children}
    </Box>
  )
}

export default DashboardCoinsBlock
