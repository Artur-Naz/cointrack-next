import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { Image } from 'mui-image'
import {
  portfolioItemSelectors,
  portfolioRatesSelectors,
  portfolioSelectors,
  SelectPortfolioRatesById,
  useGetUserPortfolioQuery,
  useSyncPortfolioByIdMutation,
  useSyncPortfolioItemByIdMutation
} from '../../api/portfoliosApi'
import { memo, useCallback } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { useAppSelector } from '../../../../store/hooks'
import { selectJobById } from '../../slices/jobSlice'
import IconButton from '@mui/material/IconButton'
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone'
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone'
import { styled, useTheme } from '@mui/material/styles'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'

type PortfolioMenuItemProps = {
  id: string
  name?: string
  image?: string
  balance?: number
  sparkline?: number[]
  sync: (e: MouseEvent) => void
  syncing: boolean
  job?: string | null
}
function LinearBuffer({ id }: { id: string }) {
  const currentJob = useAppSelector(state => selectJobById(state, id))

  return (
    <Box sx={{ width: '100%' }}>
      {currentJob?.state === 'active' && <LinearProgress variant='determinate' value={currentJob.progress} />}
    </Box>
  )
}
const SyncButton: React.FC<{ jobId?: string; sync: (e: any) => void; syncing: boolean }> = ({
  sync,
  syncing,
  jobId
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentJob = jobId ? useAppSelector(state => selectJobById(state, jobId)) : undefined
  let icon
  switch (currentJob?.state) {
    case 'waiting':
      icon = <HourglassTopTwoToneIcon />
      break
    case 'active':
      icon = <HourglassTopTwoToneIcon color={'primary'} />
      break
    case 'completed':
      icon = <CheckCircleTwoToneIcon color={'success'} />
      break
    case 'failed':
      icon = <ErrorTwoToneIcon color={'error'} />
      break
    default:
      icon = <SyncTwoToneIcon />
  }

  return (
    <IconButton size={'small'} disabled={syncing || !!currentJob} onClick={sync}>
      {icon}
    </IconButton>
  )
}
const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary expandIcon={null} {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    padding: '0 !Important',
    display: 'flex',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
      margin: 0
    }
  })
)
const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({
  id,
  name,
  image,
  sparkline,
  balance,
  sync,
  syncing
}) => {
  const theme = useTheme()
  const formattedBalance = balance?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        padding: theme.spacing(1, 5)

        //...(index !== data.length - 1 ? { mb: 5.875 } : {})
      }}
    >
      <Box sx={{ width: 38, height: 38, marginRight: 3, fontSize: '1rem', color: 'common.white' }}>
        <Image
          alt={name}
          fit={'contain'}
          bgColor={'transparent'}
          height={38}
          width={38}
          shiftDuration={400}
          easing={'ease-in-out'}
          shift='right'
          distance={16}
          src={image || ''}
          showLoading
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            marginRight: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              flexGrow: 5,
              fontWeight: 600,
              letterSpacing: '0.25px',
              maxWidth: '50%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {formattedBalance}
          </Typography>

          <Box sx={{ display: 'flex', flexShrink: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
              <Typography
                variant='caption'
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: 'success.main'
                }}
              >
                3.4%
              </Typography>
            </Box>
            <SyncButton sync={sync} syncing={syncing} jobId={id} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant='caption' sx={{ flexGrow: 3, lineHeight: 1.5 }}>
            {name}
          </Typography>

          <Sparklines style={{ flexGrow: 1, height: '16px' }} data={sparkline}>
            <SparklinesLine color='#56CA00' />
            {/*<SparklinesSpots style={{ fill: "#56b45d" }} />*/}
          </Sparklines>
        </Box>

        <LinearBuffer id={id}/>
      </Box>
    </Box>
  )
}
export const PortfolioMenuItemSummary = memo(({ id }: any) => {
  const { portfolio, rates } = useGetUserPortfolioQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        portfolio: data ? portfolioSelectors.selectById(data.portfolios, id) : null,
        rates: data ? portfolioRatesSelectors.selectById(data.rates, id) : null
      }
    }
  })
  const [sync, { isLoading: syncing }] = useSyncPortfolioByIdMutation()
  const syncHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      sync(id)
    },
    [sync, id]
  )

  if (!portfolio) return null

  const image = 'exchange' in portfolio ? portfolio.exchange.image : ''
  const sparkline = rates?.minutely?.map(s => s.usd || 0) ?? []
  const balance = rates?.minutely?.[0]?.usd ?? 0

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
  const { portfolioItem, rates } = useGetUserPortfolioQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        portfolioItem: data ? portfolioItemSelectors.selectById(data.portfolioItems, id) : null,
        rates: data ? SelectPortfolioRatesById(data.rates, id) : null
      }
    }
  })
  const [sync, { isLoading }] = useSyncPortfolioItemByIdMutation()

  const syncHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      sync(id)
    },
    [sync, id]
  )

  if (!portfolioItem) return null

  const sparkline = rates?.minutely?.map(s => s.usd) ?? []
  const balance = rates?.minutely?.[0]?.usd ?? 0

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
