import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { memo } from 'react'

import BalanceChart from './components/Charts/BalanceChart'
import HoldingsTable from './components/HoldingsTable/HoldingsTable'
import CustomizedAccordions from './components/portfolio-menu/portfolio-menu'
import PortfoliosTabPanels from './components/tabs/PortfoliosTabPanel'
import StatisticsCard from '../../views/dashboard/StatisticsCard'
import WeeklyOverview from '../../views/dashboard/WeeklyOverview'
import TotalEarning from '../../views/dashboard/TotalEarning'
import CardStatisticsVerticalComponent from '../../@core/components/card-statistics/card-stats-vertical'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import SalesByCountries from '../../views/dashboard/SalesByCountries'
import DepositWithdraw from '../../views/dashboard/DepositWithdraw'
import Table from '../../views/dashboard/Table'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

const MainDashboard = memo(() => (
  <Grid container spacing={6}>
    <Grid item xs={12} lg={6}>
      <BalanceChart />
    </Grid>
    <Grid item xs={12} lg={6}>
      <StatisticsCard />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <WeeklyOverview />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <TotalEarning />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <CardStatisticsVerticalComponent
            stats='$25.6k'
            icon={<Poll />}
            color='success'
            trendNumber='+42%'
            title='Total Profit'
            subtitle='Weekly Profit'
          />
        </Grid>
        <Grid item xs={6}>
          <CardStatisticsVerticalComponent
            stats='$78'
            title='Refunds'
            trend='negative'
            color='secondary'
            trendNumber='-15%'
            subtitle='Past Month'
            icon={<CurrencyUsd />}
          />
        </Grid>
        <Grid item xs={6}>
          <CardStatisticsVerticalComponent
            stats='862'
            trend='negative'
            trendNumber='-18%'
            title='New Project'
            subtitle='Yearly Project'
            icon={<BriefcaseVariantOutline />}
          />
        </Grid>
        <Grid item xs={6}>
          <CardStatisticsVerticalComponent
            stats='15'
            color='warning'
            trend='negative'
            trendNumber='-18%'
            subtitle='Last Week'
            title='Sales Queries'
            icon={<HelpCircleOutline />}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <SalesByCountries />
    </Grid>
    <Grid item xs={12} md={12} lg={8}>
      <DepositWithdraw />
    </Grid>
    <Grid item xs={12}>
      <Table />
    </Grid>
  </Grid>
))
const tabsData = [
  {
    label: 'Dashboard',
    component: <MainDashboard />
  },
  {
    label: 'Analytics',
    component: <BalanceChart />
  },
  {
    label: 'Holdings',
    component: <HoldingsTable />
  }
]
const Dashboard: React.FC = () => {

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={6} lg={3} item container spacing={2}>
          <Grid item xs={12}>
            <CustomizedAccordions />
            <Card sx={{ mt: 5 }}>
              <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={[5, 0]}>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid xs={6} lg={9} direction={'column'} item container spacing={2}>
          {/*<Grid item>*/}
          {/*<PortfolioTabs tabs={tabsData} />*/}
          {/*</Grid>*/}
          <Grid item>
            <PortfoliosTabPanels tabs={tabsData} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(Dashboard, () => false)

// // This function gets called at build time
// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({req, res}) =>{
//     return {
//         props: {},
//     }
// })
