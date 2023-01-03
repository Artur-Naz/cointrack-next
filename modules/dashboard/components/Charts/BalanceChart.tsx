import {Box, FormControl, FormGroup, Typography} from "@mui/material"
import React, {memo, useMemo, useState} from "react"
import SelectSmall from "../../../../shared/components/select"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment/moment";
import {timeLine} from "../../../../shared/components/chartDetales/timeLine";
import CustomTooltip from "../../../../shared/components/chartDetales/CustomTooltip";
import CustomizedDot from "../../../../shared/components/chartDetales/CustomizedDot";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {portfolioItemSelectors, portfolioSelectors, useGetUserPortfolioQuery} from "../../api/portfoliosApi";
import {useAppSelector} from "../../../../store/hooks";
import {selectSelectedPortfolio} from "../../slices/dashboardSlice";

export type BalanceChartData = {
    name: string
    value: number
}


const BalanceChart: React.FC = () => {
    const selectedPortfolioId = useAppSelector(selectSelectedPortfolio)
    const { rates } = useGetUserPortfolioQuery(undefined, {
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            if(data){
                if(selectedPortfolioId){
                  const selectedPortfolio =  portfolioSelectors.selectById(data.portfolios, selectedPortfolioId) ||  portfolioItemSelectors.selectById(data.portfolioItems, selectedPortfolioId)
                   return {
                      rates:  selectedPortfolio?.rates.usd,
                       error, isLoading
                   }
                }else{
                    return {
                        rates:  data.rates,
                        error, isLoading
                    }
                }
            }


            return {
                rates:  [[[]],[[]],[[]]],
                error, isLoading
            }
        },
    })

    const data = useMemo(() => rates ? rates[0]?.map(([time, balance]) => ({name: time, value: balance})) : [], [rates])

    const colors: string[] = [
        '#6F52D8',
        '#8659FF',
        '#AA82FF',
        '#CDAFFF',
        '#6C31FF',
        '#9D62FF',
        '#5B1FFF',
        '#3700FF',
        '#3D24BA',
        '#403687',
        '#564CD6',
        '#522CAF'
    ]

    const [state, setState] = useState({
        usd: true,
        btc: false,
        eth: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const {usd, btc, eth} = state;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: "column",
        }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography>Total Points</Typography>
                <SelectSmall/>
                <Typography>See more</Typography>
            </Box>
            <ResponsiveContainer aspect={3}>
                <LineChart data={data} margin={{top: 20, left: 8}}>
                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        stroke={"#EBEDF4"}
                    />
                    <XAxis
                        dataKey="name"
                        tickFormatter={(tick) => {
                            return moment(tick).format(timeLine["24h"])
                        }}
                        padding={{left: 5, right: 5}}
                        tickLine={false}
                        height={50}
                        dy={18}
                        fontSize={"12.83px"}
                        stroke={"#FFFFFF"}
                        interval={"preserveStart"}

                    />

                    <YAxis
                        tickCount={5}
                        tickLine={false}
                        fontSize={"13px"}
                        stroke={"#FFFFFF"}
                        type={"number"}
                        domain={["dataMin", "auto"]}
                        interval={0}
                        tickFormatter={(e) => `$${e}`}
                    />


                    <Tooltip
                        content={(props: any) => <CustomTooltip {...props} />}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        fill="#8884d8"
                        dot={false}
                        activeDot={(props: any) => <CustomizedDot {...props} />} stroke={"#805AD5"}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
            <FormControl component="fieldset" variant="filled">
                <FormGroup sx={{
                    justifyContent: "end",
                    flexDirection: 'row',
                }}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={usd} onChange={handleChange} name="usd" />
                        }
                        label="USD"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={btc} onChange={handleChange} name="btc" />
                        }
                        label="BTC"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={eth} onChange={handleChange} name="eth" />
                        }
                        label="ETH"
                    />
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default memo(BalanceChart)
