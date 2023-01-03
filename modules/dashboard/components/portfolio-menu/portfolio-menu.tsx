import * as React from 'react';
import Box from "@mui/material/Box";
import {FormControl, InputLabel, Paper, Select, Stack} from "@mui/material";
import {memo, SyntheticEvent, useCallback, useEffect, useMemo} from "react";
import {portfolioItemSelectors, portfolioSelectors, useGetUserPortfolioQuery} from "../../api/portfoliosApi";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectAuthState} from "../../../../store/slices/authSlice";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchInput from "../../../../shared/components/inputs/SearchInput";
import PortfolioAccordion from "./PortfolioAccordion";
import _ from "lodash";


function CustomizedAccordions() {
    const isAuth = useAppSelector(selectAuthState)
    const {portfolios, portfolioItems, isLoading, isFetching, error} = useGetUserPortfolioQuery(undefined, {
        pollingInterval: 5 * 60000,
        refetchOnMountOrArgChange: false,
        skip: !isAuth,
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            return {
                portfolios: data ? portfolioSelectors.selectAll(data.portfolios) : [],
                portfolioItems: data ? portfolioItemSelectors.selectAll(data.portfolioItems) : [],
                error,
                isLoading,
                isFetching
            }
        },
    })
    //TODO implement sort and search
    const selectResult = useMemo(() => {
        const filteredPortfolioItems =  portfolioItems.filter(Boolean)
        return _.groupBy(filteredPortfolioItems, (item) => item.parentId)
    }, [portfolios, portfolioItems])

    if (isLoading) return (<Box>Skeleton</Box>)

    if (error) return (<Box> {JSON.stringify(error)} </Box>)

    return (
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

           <PortfolioAccordion portfolios={selectResult} />
        </Box>

    );
}

export default memo(CustomizedAccordions)
