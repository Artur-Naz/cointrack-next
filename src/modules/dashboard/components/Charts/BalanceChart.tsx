import { Box, FormControl, FormGroup, Typography } from '@mui/material'
import React, { memo, useMemo, useState } from 'react'
import SelectSmall from '../../../../shared/components/select'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import moment from 'moment/moment'
import { timeLine } from '../../../../shared/components/chartDetales/timeLine'
import CustomTooltip from '../../../../shared/components/chartDetales/CustomTooltip'
import CustomizedDot from '../../../../shared/components/chartDetales/CustomizedDot'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import {
  portfolioItemSelectors,
  portfolioSelectors,
  SelectPortfolioRatesById,
  useGetUserPortfolioQuery
} from '../../api/portfoliosApi'
import { useAppSelector } from '../../../../store/hooks'
import { selectSelectedPortfolio } from '../../slices/dashboardSlice'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { selectAuthState } from '../../../../store/slices/authSlice'

export type BalanceChartData = {
  name: string
  value: number
}

const BalanceChart: React.FC = () => {
  const selectedPortfolioId = useAppSelector(selectSelectedPortfolio)
  const isAuth = useAppSelector(selectAuthState)
  const { rates } = useGetUserPortfolioQuery(undefined, {
    skip: !isAuth,
    selectFromResult: ({ data, error, isLoading, isFetching }) => {
      if (data) {
        if (selectedPortfolioId) {
          return {
            rates: data ? SelectPortfolioRatesById(data.rates, selectedPortfolioId) : null,
            error,
            isLoading
          }
        } else {
          return {
            rates: data ? SelectPortfolioRatesById(data.rates, 'all') : null,
            error,
            isLoading
          }
        }
      }

      return {
        rates: { minutely: [], hourly: [], daily: [] },
        error,
        isLoading
      }
    }
  })

  let data = useMemo(
    () =>
     rates?.minutely?.map(({ timestamp, usd }) => ({ name: timestamp, value: usd })),
    [rates]
  )
  if(!data?.length) data =  [{ name: 0, value: 0 }]
  console.log(data)
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
    eth: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const { usd, btc, eth } = state

  return (
    <Card>
      <CardHeader
        title='Total Points'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={null}
        titleTypographyProps={{
          sx: {
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <ResponsiveContainer aspect={3} height={250}>
            <LineChart data={data}  margin={{ top: 20, left: 8 }}>
              <CartesianGrid horizontal={true} vertical={false} stroke={'#EBEDF4'} />
              <XAxis
                dataKey='name'
                tickFormatter={tick => {
                  return moment(tick).format(timeLine['24h'])
                }}
                padding={{ left: 5, right: 5 }}
                tickLine={false}
                height={50}
                dy={18}
                fontSize={'12.83px'}
                stroke={'#FFFFFF'}
                interval={'preserveStart'}
              />

              <YAxis
                tickCount={5}
                tickLine={false}
                fontSize={'13px'}
                stroke={'#FFFFFF'}
                type={'number'}
                domain={['dataMin', 'auto']}
                interval={0}
                tickFormatter={e => `$${e}`}
              />

              <Tooltip content={(props: any) => <CustomTooltip {...props} />} />
              <Line
                type='monotone'
                dataKey='value'
                fill='#8884d8'
                dot={false}
                activeDot={(props: any) => <CustomizedDot {...props} />}
                stroke={'#805AD5'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <FormControl component='fieldset' variant='filled'>
            <FormGroup
              sx={{
                justifyContent: 'end',
                flexDirection: 'row'
              }}
            >
              <FormControlLabel control={<Checkbox checked={usd} onChange={handleChange} name='usd' />} label='USD' />
              <FormControlLabel control={<Checkbox checked={btc} onChange={handleChange} name='btc' />} label='BTC' />
              <FormControlLabel control={<Checkbox checked={eth} onChange={handleChange} name='eth' />} label='ETH' />
            </FormGroup>
          </FormControl>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default memo(BalanceChart)
