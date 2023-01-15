import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import React, {memo} from "react";
import {
    portfolioHoldingSelectors,
    portfolioItemSelectors,
    portfolioSelectors,
    useGetUserPortfolioQuery
} from "../../api/portfoliosApi";
import {useAppSelector} from "../../../../store/hooks";
import {selectSelectedPortfolio} from "../../slices/dashboardSlice";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DotsVertical from "mdi-material-ui/DotsVertical";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuUp from "mdi-material-ui/MenuUp";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";

type HoldingsTableProps = {

   // rows : Array<Holding & { parentId: string }>
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'slug',
        headerName: 'slug',
        width: 150,
        editable: true,
    },
    {
        field: 'currency',
        headerName: 'Currency',
        width: 150,
        editable: true,
    },
    {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'price',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) => params.row.coin?.currentPrice,
    },
];
const HoldingsTable: React.FC<HoldingsTableProps> = ({  }) => {

    const selectedPortfolioId = useAppSelector(selectSelectedPortfolio)
    const { holdings, isLoading, isFetching, error } = useGetUserPortfolioQuery(undefined, {
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            if(data){
                if(selectedPortfolioId){
                    const selectedPortfolio =  portfolioSelectors.selectById(data.portfolios, selectedPortfolioId) ||  portfolioItemSelectors.selectById(data.portfolioItems, selectedPortfolioId)
                   if(selectedPortfolio){
                       if('parentId' in selectedPortfolio){
                           return {
                               holdings:  portfolioHoldingSelectors.selectAll(data.holdings).filter(h => h.parentId === selectedPortfolio.id),
                               error, isLoading, isFetching
                           }
                       }else{
                           return {
                               holdings:  portfolioHoldingSelectors.selectAll(data.holdings).filter(h => selectedPortfolio.itemIds.includes(h.parentId)),
                               error, isLoading, isFetching
                           }

                       }

                   }

                }else{
                    return {
                        holdings:  portfolioHoldingSelectors.selectAll(data.holdings),
                        error, isLoading, isFetching
                    }
                }
            }


            return {
                holdings:  [],
                error, isLoading, isFetching
            }
        },
    })

  return  <Card>
    <CardHeader
      title='Holdings'
      titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
      action={
        <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
          <DotsVertical />
        </IconButton>
      }
    />
    <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
      <DataGrid
        sx={{
          height: '600px'
        }}
        loading={isLoading}
        rows={holdings}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5, 20, 30]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </CardContent>
  </Card>
}

export default memo(HoldingsTable)
