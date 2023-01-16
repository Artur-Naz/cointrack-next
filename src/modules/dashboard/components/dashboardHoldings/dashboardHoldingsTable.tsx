import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import Image from 'next/image'

// datai mshakum
function createData(
  name: string,
  amount: number,
  price: number,
  total: number,
  oneHCHanges: number,
  marketCap: number,
  PriceInBTC: number
) {
  return {
    name,
    amount,
    price,
    total,
    oneHCHanges,
    marketCap,
    PriceInBTC
  }
}
const rows = [createData('Cupcake', 305, 3.7, 67, 4.3, 6, 8), createData('Cupcake', 305, 3.7, 67, 4.3, 6, 8)]

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

function stableSort(array: any, comparator: any) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map((el: any) => el[0])
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total'
  },
  {
    id: 'oneHCHanges',
    numeric: true,
    disablePadding: false,
    label: '1H Changes'
  },
  {
    id: 'marketCap',
    numeric: true,
    disablePadding: false,
    label: 'Market Cap'
  },
  {
    id: 'PriceInBTC',
    numeric: true,
    disablePadding: false,
    label: 'Price in BTC'
  }
]

function EnhancedTableHead(props: any) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  //pagination
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ overflowX: 'hidden' }}>
          <Table sx={{ minWidth: '100%' }} aria-labelledby='tableTitle'>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover key={row.name}>
                      <TableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Image src={'/test-coin-icon-for-dahsboard-table.svg'} alt='asdasd' />
                        {row.name}
                      </TableCell>
                      <TableCell align='center'>{row.amount}</TableCell>
                      <TableCell align='center'>{row.price}</TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          display: { xs: 'none', sm: 'flex', md: 'flex' },
                          backgroundSize: { sm: 'cover' }
                        }}
                      >
                        {row.total}
                      </TableCell>
                      <TableCell align='center'>{row.oneHCHanges}</TableCell>
                      <TableCell align='center'>{row.marketCap}</TableCell>
                      <TableCell align='center'>{row.PriceInBTC}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ overflowX: 'hidden' }}
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
