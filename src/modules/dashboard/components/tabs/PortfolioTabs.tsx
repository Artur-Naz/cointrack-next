import * as React from 'react'
import { styled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PhoneIcon from '@mui/icons-material/Phone'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { selectCurrentTab, setDashboardTab } from '../../slices/dashboardSlice'
import { memo, useMemo } from 'react'
import { Typography } from '@mui/material'
import { TabProps, TabTypeMap } from '@mui/material/Tab/Tab'

interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
  // '& .MuiTabs-indicator': {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   backgroundColor: 'transparent'
  // },
  // '& .MuiTabs-indicatorSpan': {
  //   maxWidth: 40,
  //   width: '100%',
  //   backgroundColor: '#635ee7'
  // }
})

interface StyledTabProps {
  label: React.ReactNode
  icon?: React.ReactNode
  iconPosition: string
}

export const StyledTab = memo(
  styled((props: TabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
    // textTransform: 'none',
    // fontWeight: theme.typography.fontWeightRegular,
    // fontSize: theme.typography.pxToRem(15),
    // marginRight: theme.spacing(1),
    // color: 'rgba(255, 255, 255, 0.7)',
    // backgroundColor: theme.palette.background.paper,
    // borderRadius: 6,
    // border: '1px solid blue',
    // borderColor: theme.palette.background.paper,
    // '&.Mui-selected': {
    //   color: '#fff',
    //   borderColor: theme.palette.primary.main
    // },
    // '&.Mui-focusVisible': {
    //   backgroundColor: 'rgba(100, 95, 228, 0.32)'
    // }
  }))
)
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
interface PortfolioTabsProps {
  children?: React.ReactNode
  tabs: {label:React.ReactNode }[]
}
const PortfolioTabs: React.FC<PortfolioTabsProps> = ({ tabs }) => {
  const currentTab = useAppSelector(selectCurrentTab)
  const dispatch = useAppDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setDashboardTab(newValue))
  }

  const tabElements = useMemo(
    () =>
      tabs.map(({ label }, index) => (
        <StyledTab
          key={index}
          iconPosition='start'

          //icon={<PhoneIcon />}
          label={<Typography variant='subtitle2'>{label}</Typography>}
          {...a11yProps(index)}
        />
      )),
    []
  )

  return (
    <StyledTabs value={currentTab} onChange={handleChange} aria-label='styled tabs example'>
      {tabElements}
    </StyledTabs>
  )
}

export default memo(PortfolioTabs)
