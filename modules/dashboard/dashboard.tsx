import {
    Box,
    Card, CardActions, CardContent,
    FormControl,
    InputBase,
    InputLabel,
    Paper,
    Select, Stack, Tab, Tabs,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import SearchInput from "../../components/inputs/SearchInput";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import React, {memo, useEffect, useMemo} from "react";
import {useGetUserPortfolioQuery} from "../../modules/dashboard/api/portfolios";
import CustomizedTreeView from "../../components/tree-view";
import CustomizedAccordions from "./components/portfolio-menu/portfolio-menu";


const MyStack = styled(Stack)(({theme}) => ({
    overflowX: 'auto',
    pb: 1,
    // width:`calc(100vw - ${isDrawerOpen ? 264 : 60}px);`,
    '&::-webkit-scrollbar': {
        marginTop: 10,
        height: '0.5rem',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        backgroundColor: '#555a63',
    },
    '&::-webkit-scrollbar-thumb': {
        height: '0.6rem',
        borderRadius: '7px',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
        backgroundColor: '#805ad5',
        borderRight: '50px solid transparent'
    }
}));
const Dashboard = () => {
    const theme = useTheme();

    console.log('Dashboard');
    return (
        <Box>
            <Grid  container spacing={2}>
                <Grid  xs={6} lg={4} item container spacing={2}  >
                    <Grid item xs={12}   >
                        <Box p={1} sx={{
                            minHeight:300,
                            height: 600,
                            overflow:'hidden',
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
                <Grid  xs={6} lg={8} direction={'row'}  item container spacing={2} >
                    <Grid item xs={12} height={64}>
                        <Tabs
                            value={0}
                            //onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                            <Tab label="Item Four" />
                            <Tab label="Item Five" />
                            <Tab label="Item Six" />
                            <Tab label="Item Seven" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper sx={{height:'100%'}}>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</Typography>

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
