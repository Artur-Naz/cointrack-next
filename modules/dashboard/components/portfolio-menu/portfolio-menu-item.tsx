import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { Image } from 'mui-image'
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


const PortfolioMenuItem =  ({name, icon, sparkline}:any) => {
    return(
        <Grid
            container component={Button} spacing={0} alignContent={'flex-start'} justifyContent={'flex-start'} alignItems={'center'}>
            <Grid item xs={1} justifySelf={'end'}>
                <Image
                    fit={'contain'}
                    bgColor={'transparent'}
                    height={20}
                    shiftDuration={400}
                    easing={'ease-in-out'}
                    shift="right"
                    distance={16}

                    src={icon}
                    showLoading
                />


            </Grid>
            <Grid item xs={9}>
                <Typography align={'left'} variant="subtitle1" noWrap >
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5"  color={'green'}>
                    4.85%
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h5" align={'left'}  color={'white'}>
                    123,456.89$
                </Typography>

            </Grid>
            <Grid item xs={7}>
                <Sparklines style={{paddingLeft: '6px', height:16, width: '100%'}}   data={sparkline[0].map((s:any) => s[1])}>
                    <SparklinesLine color="green" />
                    {/*<SparklinesSpots style={{ fill: "#56b45d" }} />*/}
                </Sparklines>
            </Grid>
        </Grid>)
}

export default PortfolioMenuItem
