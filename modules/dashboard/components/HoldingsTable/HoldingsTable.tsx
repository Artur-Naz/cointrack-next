import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import React from "react";
import {
    Holding,
    portfolioHoldingSelectors,
    portfolioItemSelectors,
    portfolioSelectors,
    useGetUserPortfolioQuery
} from "../../api/portfoliosApi";

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
    const {holdings, isLoading, isFetching, error} = useGetUserPortfolioQuery(undefined, {
        selectFromResult: ({data, error, isLoading, isFetching}) => {
            return {
                holdings: data ? portfolioHoldingSelectors.selectAll(data.holdings) : [],
                error,
                isLoading,
                isFetching
            }
        },
    })


    return  <DataGrid
        sx={{
            height: '600px'
        }}
        loading={isLoading}
        rows={holdings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
    />
}

export default HoldingsTable
