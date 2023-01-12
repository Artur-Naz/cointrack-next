import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Sparklines, SparklinesLine } from 'react-sparklines';
import {Image} from 'mui-image'
import Grid from "@mui/material/Grid";
import {
  portfolioItemSelectors,
  portfolioSelectors,
  useGetUserPortfolioQuery,
  useSyncPortfolioByIdMutation, useSyncPortfolioItemByIdMutation
} from '../../api/portfoliosApi'
import {memo} from "react";
import {AccordionSummary} from "@mui/material";
import { useLoginMutation } from '../../../auth/api/authApi'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

type PortfolioMenuItemProps = {
    name?: string,
    image?: string,
    balance?: number
    sparkline?: number[],
    sync: () => void
}
function LinearBuffer() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}
const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({name, image, sparkline, balance, sync}: any) => {
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
          <Button onClick={sync}>sync</Button>
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
          <Grid item xs={12}>
            <LinearBuffer></LinearBuffer>
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
  const [sync, { isLoading: syncing }] = useSyncPortfolioByIdMutation()

    if (!portfolio || isLoading) return <p>Skeleton</p>
   const [general = [[0,0]]] = portfolio?.rates.usd
    const image = 'exchange' in portfolio ? portfolio.exchange.image : ''
    const sparkline = general?.map((s) => s[1]) ?? []
    const balance = general?.[0] ? general[0][1] : 0

return (<AccordionSummary>
        <PortfolioMenuItem
            sync={() => sync(id)}
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
  const [sync, { isLoading: syncing }] = useSyncPortfolioItemByIdMutation()
    const [general = [[0,0]]] = portfolioItem?.rates.usd!
    const sparkline = general?.map((s) => s[1] || 0) ?? []
    const balance = general?.[0] ? general[0][1] : 0

return (<PortfolioMenuItem
        sync={() => sync(id)}
        name={portfolioItem?.name}
        image={portfolioItem?.image}
        balance={balance}
        sparkline={sparkline}
    />)
})

export default memo(PortfolioMenuItem)
