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
import SearchInput from "../../shared/components/inputs/SearchInput";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Grid from '@mui/material/Grid';
import React, {memo, useEffect, useMemo} from "react";
import CustomizedAccordions from "./components/portfolio-menu/portfolio-menu";
import BalanceChart from "./components/dashboardChart/BalanceChart";
import {TabPanel} from "@mui/lab";
import {PortfoliosTabPanel} from "./components/tabs/PortfoliosTabPanel";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {useRouter} from "next/router";
import PortfolioTabs, {StyledTab} from "./components/tabs/PortfolioTabs";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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
                            <DataGrid
                                sx={{
                                    height: '600px'
                                }}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                            />

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
