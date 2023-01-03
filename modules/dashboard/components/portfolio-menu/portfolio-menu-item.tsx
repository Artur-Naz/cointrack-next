import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Sparklines, SparklinesLine } from 'react-sparklines';
import {Image} from 'mui-image'
import Grid from "@mui/material/Grid";
import {portfolioItemSelectors, portfolioSelectors, useGetUserPortfolioQuery} from "../../api/portfoliosApi";
import {memo} from "react";
import {AccordionSummary} from "@mui/material";

type PortfolioMenuItemProps = {
    name?: string,
    image?: string,
    balance?: number
    sparkline?: number[]
}
const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({name, image, sparkline, balance}: any) => {

    return (
        <Grid
            container component={Button} disableRipple spacing={0} alignContent={'flex-start'} justifyContent={'flex-start'}
            alignItems={'center'}>
            <Grid item xs={1} justifySelf={'end'}>
                <Image
                    fit={'contain'}
                    bgColor={'transparent'}
                    height={20}
                    shiftDuration={400}
                    easing={'ease-in-out'}
                    shift="right"
                    distance={16}

                    src={image || ''}
                    showLoading
                />


            </Grid>
            <Grid item xs={9}>
                <Typography align={'left'} variant="subtitle1" noWrap>
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" color={'green'}>
                    4.85%
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h5" align={'left'} color={'white'}>
                    {balance}$
                </Typography>

            </Grid>
            <Grid item xs={7}>
                <Sparklines style={{paddingLeft: '6px', height: 16, width: '100%'}} data={sparkline}>
                    <SparklinesLine color="green"/>
                    {/*<SparklinesSpots style={{ fill: "#56b45d" }} />*/}
                </Sparklines>
            </Grid>
        </Grid>)
}
export const PortfolioMenuItemSummary = memo(({id}: any) => {
    const {portfolio, isLoading } = useGetUserPortfolioQuery(undefined, {
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            return {
                isLoading,
                portfolio: data ? portfolioSelectors.selectById(data.portfolios, id) : null,
            }
        },
    })
    if (!portfolio || isLoading) return <p>Skeleton</p>

    const image = 'exchange' in portfolio ? portfolio.exchange.image : ''
    const sparkline = portfolio?.rates.usd[0].map((s: any) => s[1])
    const balance = portfolio?.rates.usd[0][0] ?  portfolio?.rates.usd[0][0][1] : 0
    return (<AccordionSummary>
        <PortfolioMenuItem
            name={portfolio?.name} image={image}
            balance={balance}
            sparkline={sparkline}
        /></AccordionSummary>)
})
export const PortfolioMenuItemDetails = memo(({id}: any) => {
    const {portfolioItem, isLoading} = useGetUserPortfolioQuery(undefined, {
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            return {
                isLoading,
                portfolioItem: data ? portfolioItemSelectors.selectById(data.portfolioItems, id) : null,
            }
        },
    })
    const balance = portfolioItem?.rates.usd[0][0] ?  portfolioItem?.rates.usd[0][0][1] : 0
    return (<PortfolioMenuItem
        name={portfolioItem?.name}
        image={portfolioItem?.image}
        balance={balance}
        sparkline={portfolioItem?.rates.usd[0].map((s: any) => s[1])}
    />)
})

export default memo(PortfolioMenuItem)
