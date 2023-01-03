import {
    Box,
    FormControl,
    InputLabel,
    Paper,
    Select, Stack,
    Typography,
    useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import MenuItem from "@mui/material/MenuItem";
import React, {memo, useMemo} from "react";

import SearchInput from "../../shared/components/inputs/SearchInput";
import BalanceChart from "./components/Charts/BalanceChart";
import HoldingsTable from "./components/HoldingsTable/HoldingsTable";
import CustomizedAccordions from "./components/portfolio-menu/portfolio-menu";
import PortfolioTabs from "./components/tabs/PortfolioTabs";
import PortfoliosTabPanels from "./components/tabs/PortfoliosTabPanel";
const MainDashboard = memo(() => (<Grid container spacing={2}>
    <Grid item xs={5}>
        <Paper >
            <BalanceChart/>
        </Paper>
    </Grid>
    <Grid item xs={4}>
        <Paper sx={{height:'100%'}}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>

        </Paper>
    </Grid>
    <Grid item xs={3}>
        <Paper sx={{height:'100%'}}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>

        </Paper>
    </Grid>
    <Grid item xs={4}>
        <Paper sx={{height:'100%'}}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>

        </Paper>
    </Grid>
    <Grid item xs={4}>
        <Paper sx={{height:'100%'}}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>

        </Paper>
    </Grid>
    <Grid item xs={4}>
        <Paper sx={{height:'100%'}}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>

        </Paper>
    </Grid>
</Grid>))
const tabsData = [
    {
        label: 'item one',
        component: <MainDashboard/>,
    },
    {
        label: 'item two',
        component:  <BalanceChart/>,
    },
    {
        label: 'item three',
        component: <HoldingsTable/>,
    }
]
const Dashboard: React.FC = () => {
    const theme = useTheme();


    return (
        <Box>
            <Grid  container spacing={2}>
                <Grid  xs={6} lg={3} item container spacing={2}  >
                    <Grid item xs={12}   >
                        <CustomizedAccordions/>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper>
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid  xs={6} lg={9} direction={'column'}  item container spacing={2} >
                    <Grid item  >
                        <PortfolioTabs tabs={tabsData}/>


                    </Grid>
                    <Grid item >
                        <PortfoliosTabPanels tabs={tabsData}/>
                    </Grid>
                </Grid>
            </Grid>



        </Box>
    );
};

export default memo(Dashboard, () => false);

// // This function gets called at build time
// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({req, res}) =>{
//     return {
//         props: {},
//     }
// })
