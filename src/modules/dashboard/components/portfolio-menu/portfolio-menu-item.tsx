import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { Image } from 'mui-image'
import Grid from '@mui/material/Grid'
import {
  portfolioItemSelectors,
  portfolioSelectors,
  useGetUserPortfolioQuery,
  useSyncPortfolioByIdMutation,
  useSyncPortfolioItemByIdMutation
} from '../../api/portfoliosApi'
import { memo, useCallback, useEffect } from 'react'
import { AccordionSummary, CircularProgress } from '@mui/material'
import { useLoginMutation } from '../../../auth/api/authApi'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { useAppSelector } from '../../../../store/hooks'
import { selectJob } from '../../slices/dashboardSlice'
import { isNumber } from 'lodash'
import {selectJobById} from "../../slices/entities/job.entity";

type PortfolioMenuItemProps = {
  id: string
  name?: string
  image?: string
  balance?: number
  sparkline?: number[]
  sync: () => void
  syncing: boolean
  job?: string | null
}
function LinearBuffer({ id }: { id: string }) {
  const cuerrentJob = useAppSelector(state => selectJobById(state, id))
  const progress = isNumber(cuerrentJob?.state) ? cuerrentJob?.state : null
  return <Box sx={{ width: '100%' }}>
    <span>{cuerrentJob?.state}</span>
    {progress && <LinearProgress variant='determinate' value={progress} />}
  </Box>
}
const SyncButton: React.FC<{ job?: string; sync: () => void }> = ({ job, sync }) => {
  const cuerrentJob = useAppSelector(state => selectJob(state, job!))
  return <Button onClick={sync}>{job ? <CircularProgress color='inherit' /> : 'sync'}</Button>
}
const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({ id, name, image, sparkline, balance, sync, job }) => {


  return (
    <Grid
      container
      component={Button}
      disableRipple
      spacing={0}
      alignContent={'flex-start'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <Grid item xs={1} justifySelf={'end'}>
        <Image
          fit={'contain'}
          bgColor={'transparent'}
          height={20}
          shiftDuration={400}
          easing={'ease-in-out'}
          shift='right'
          distance={16}
          src={image || ''}
          showLoading
        />
      </Grid>
      <Button disabled={false} onClick={sync}>
        sync
      </Button>
      <Grid item xs={9}>
        <Typography align={'left'} variant='subtitle1' noWrap>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h5' color={'green'}>
          4.85%
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant='h5' align={'left'} color={'white'}>
          {balance}$
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Sparklines style={{ paddingLeft: '6px', height: 16, width: '100%' }} data={sparkline}>
          <SparklinesLine color='green' />
          {/*<SparklinesSpots style={{ fill: "#56b45d" }} />*/}
        </Sparklines>
      </Grid>
        <Grid item xs={12}>
          <LinearBuffer id={id}></LinearBuffer>
        </Grid>
    </Grid>
  )
}
export const PortfolioMenuItemSummary = memo(({ id }: any) => {
  const { portfolio } = useGetUserPortfolioQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        portfolio: data ? portfolioSelectors.selectById(data.portfolios, id) : null
      }
    }
  })
  const [sync, { isLoading: syncing }] = useSyncPortfolioByIdMutation()
  const syncHandler = useCallback(() => sync(id), [id])

  if (!portfolio) return null

  const [general = [[0, 0]]] = portfolio?.rates.usd
  const image = 'exchange' in portfolio ? portfolio.exchange.image : ''
  const sparkline = general?.map(s => s[1]) ?? []
  const balance = general?.[0] ? general[0][1] : 0

  return (
    <AccordionSummary>
      <PortfolioMenuItem
        id={portfolio.id}
        sync={syncHandler}
        syncing={syncing}
        name={portfolio?.name}
        image={image}
        balance={balance}
        sparkline={sparkline}
      />
    </AccordionSummary>
  )
})
export const PortfolioMenuItemDetails = memo(({ id }: any) => {
  const { portfolioItem } = useGetUserPortfolioQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        portfolioItem: data ? portfolioItemSelectors.selectById(data.portfolioItems, id) : null
      }
    }
  })
  const [sync, { isLoading }] = useSyncPortfolioItemByIdMutation()

  const syncHandler = useCallback(() => sync(id), [id])

  if (!portfolioItem) return null



  const [general = [[0, 0]]] = portfolioItem.rates.usd!
  const sparkline = general?.map(s => s[1] || 0) ?? []
  const balance = general?.[0] ? general[0][1] : 0

  return (
    <PortfolioMenuItem
      id={portfolioItem.id}
      sync={syncHandler}
      syncing={isLoading}
      name={portfolioItem?.name}
      image={portfolioItem?.image}
      balance={balance}
      sparkline={sparkline}
    />
  )
})

export default memo(PortfolioMenuItem)
