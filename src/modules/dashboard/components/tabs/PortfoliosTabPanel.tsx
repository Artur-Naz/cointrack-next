import React, { memo } from 'react'
import Box from '@mui/material/Box'
import { useAppSelector } from '../../../../store/hooks'
import { selectCurrentTab } from '../../slices/dashboardSlice'

interface PortfoliosTabPanelProps {
  children?: React.ReactNode
  index: number
}
interface PortfoliosTabPanelsProps {
  tabs: any[]
}
const PortfoliosTabPanel: React.FC<PortfoliosTabPanelProps> = ({ children, index, ...other }) => {
  const currentTab = useAppSelector(selectCurrentTab)

  if (currentTab !== index) return null

  return (
    <Box
      role='tabpanel'
      hidden={currentTab !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {children}
    </Box>
  )
}

const PortfoliosTabPanels: React.FC<PortfoliosTabPanelsProps> = ({ tabs, ...other }) => {
  return (
    <>
      {tabs.map(({ component }, index) => (
        <PortfoliosTabPanel key={index} index={index} {...other} >
          {component}
        </PortfoliosTabPanel>
      ))}
    </>
  )
}

export default memo(PortfoliosTabPanels)
