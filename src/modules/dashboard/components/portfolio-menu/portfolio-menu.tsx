import * as React from 'react'
import Box from '@mui/material/Box'
import { FormControl, FormGroup, InputLabel, Paper, Select, Stack } from '@mui/material'
import { memo, SyntheticEvent, useCallback, useEffect, useMemo } from 'react'
import { portfolioItemSelectors, portfolioSelectors, useGetUserPortfolioQuery } from '../../api/portfoliosApi'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { selectAuthState } from '../../../../store/slices/authSlice'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import SearchInput from '../../../../shared/components/inputs/SearchInput'
import PortfolioAccordion from './PortfolioAccordion'
import _ from 'lodash'

// ** Third Party Components
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import moment from 'moment'
import { timeLine } from '../../../../shared/components/chartDetales/timeLine'
import CustomTooltip from '../../../../shared/components/chartDetales/CustomTooltip'
import CustomizedDot from '../../../../shared/components/chartDetales/CustomizedDot'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

const styles = {
  maxHeight: '100vh',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  },

}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})
function CustomizedAccordions() {
  const isAuth = useAppSelector(selectAuthState)
  const { portfolios, portfolioItems, isLoading, isFetching, error } = useGetUserPortfolioQuery(undefined, {
    pollingInterval: 5 * 60000,
    refetchOnMountOrArgChange: false,
    skip: !isAuth,
    selectFromResult: ({ data, error, isLoading, isFetching }) => {
      return {
        portfolios: data ? portfolioSelectors.selectAll(data.portfolios) : [],
        portfolioItems: data ? portfolioItemSelectors.selectAll(data.portfolioItems) : [],
        error,
        isLoading,
        isFetching
      }
    }
  })

  //TODO implement sort and search
  const selectResult = useMemo(() => {
    const filteredPortfolioItems = portfolioItems.filter(Boolean)

    return _.groupBy(filteredPortfolioItems, item => item.parentId)
  }, [portfolios, portfolioItems])

  if (isLoading) return <Box>Skeleton</Box>

  if (error) return <Box> {JSON.stringify(error)} </Box>

  return (
    <Card>
      <CardHeader
        disableTypography={true}
        subheader={
          <>
            <Stack spacing={2} direction='row'>
              <Button variant='outlined' size='small'>
                Hide
              </Button>
              <FormControl sx={{ m: 1 }} size='small'>
                <InputLabel id='demo-select-small'>Age</InputLabel>
                <Select labelId='demo-select-small' id='demo-select-small' value={10} label='Age'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <SearchInput />
          </>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important`,px: theme => `${theme.spacing(0)} !important` }}>
        <Grid container spacing={[5, 0]} >
          <PerfectScrollbar
            options={{ wheelPropagation: false, suppressScrollX: true, }}
            sx={{
              maxHeight: 'calc(100vh - 250px)',
              width: '100%',
              padding: theme => theme.spacing(0,5)
              // '& .ps': {
              //   overflowX: 'auto !Important',
              // },
              // '& .ps__rail-y': {
              //   right: '-16px !Important',
              // }
            }}
          >
            <PortfolioAccordion portfolios={selectResult} />
          </PerfectScrollbar>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default memo(CustomizedAccordions)
