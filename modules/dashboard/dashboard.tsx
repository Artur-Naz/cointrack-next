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
import React, {memo} from "react";

import SearchInput from "../../shared/components/inputs/SearchInput";
import BalanceChart from "./components/Charts/BalanceChart";
import HoldingsTable from "./components/HoldingsTable/HoldingsTable";
import CustomizedAccordions from "./components/portfolio-menu/portfolio-menu";
import {PortfoliosTabPanel} from "./components/tabs/PortfoliosTabPanel";
import PortfolioTabs, {StyledTab} from "./components/tabs/PortfolioTabs";


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Dashboard: React.FC = () => {
    const theme = useTheme();
       const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Grid  container spacing={2}>
                <Grid  xs={6} lg={3} item container spacing={2}  >
                    <Grid item xs={12}   >
                        <Box p={1} sx={{
                            minHeight:300,
                        }} component={Paper}>
                            <Stack  spacing={2} direction="row" >

                                <Button variant="outlined" size="small">Hide</Button>
                                <FormControl sx={{m: 1, }} size="small">
                                    <InputLabel id="demo-select-small">Age</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={10}
                                        label="Age"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <SearchInput/>

                            <CustomizedAccordions></CustomizedAccordions>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper>
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid  xs={6} lg={9} direction={'column'}  item container spacing={2} >
                    <Grid item  >
                        <PortfolioTabs value={value} onChange={handleChange}>
                            <StyledTab label="Item One" {...a11yProps(0)}/>
                            <StyledTab label="Item Two" {...a11yProps(1)}/>
                            <StyledTab label="Item Three" {...a11yProps(2)}/>
                            <StyledTab label="Item Four" {...a11yProps(3)}/>
                            <StyledTab label="Item Five" {...a11yProps(4)}/>
                            <StyledTab label="Item Six" {...a11yProps(5)}/>
                            <StyledTab label="Item Seven" {...a11yProps(6)}/>
                        </PortfolioTabs>
                    </Grid>
                    <Grid item >
                        <PortfoliosTabPanel value={value} index={0}>
                            <Grid container spacing={0}>
                                <Grid item xs={5}>
                                    <Paper sx={{height:'100%'}}>
                                        <BalanceChart data={[]}/>
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
                            </Grid>
                        </PortfoliosTabPanel>
                        <PortfoliosTabPanel value={value} index={1}>
                            <BalanceChart data={[]}/>
                        </PortfoliosTabPanel>
                        <PortfoliosTabPanel value={value} index={2}>
                            <HoldingsTable/>
                        </PortfoliosTabPanel>
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
