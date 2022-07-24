/*
    REQUIRE:
        - npm i @mui/material @5.8.6

    EX:
        import CustomTable from './components/table';

        const bodyRow = (i, data) => {
            return (
                <>
                    <TableCell> {i} </TableCell>
                    <TableCell> {data.username} </TableCell>
                    <TableCell> {data.email} </TableCell>
                </>
            )
        }

        const headColumn = [
            { label: '#', sortKey: null, align: 'left', },
            { label: 'username', sortKey: 'username', align: 'left', },
            { label: 'email', sortKey: 'email', align: 'left', },
        ]

        <CustomTable
            data={data} // array of data in table
            headColumn={headColumn} // array of header column list 
            bodyRow={bodyRow} // function return jsx for each row
        />

    OPTIONS & PARAMETER:
*/

import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { MenuItem, TextField, Typography } from '@mui/material';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    else if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props) => {
    const { headColumn, order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => onRequestSort(event, property);

    return (
        <TableHead>
            <TableRow >
                {headColumn.map((column, i) => (
                    <TableCell key={i}
                        sortDirection={orderBy === i ? order : false}
                        sx={{ border: 'none', boxShadow: '0 8px 12px -6px rgba(0,0,0,.1)' }}
                        align={column.align || 'left'}
                    >
                        {
                            column.sortKey ?
                                <TableSortLabel
                                    active={orderBy === column.sortKey}
                                    direction={orderBy === column.sortKey ? order : 'asc'}
                                    onClick={createSortHandler(column.sortKey)}
                                >
                                    {column.label}
                                </TableSortLabel>
                                :
                                column.label
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable({ data, bodyRow, headColumn }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
                <Table stickyHeader sx={{ minWidth: 750 }} >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumn={headColumn}
                    />
                    <TableBody>
                        {stableSort(data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover key={i} sx={{
                                        '&:nth-of-type(odd)': { bgcolor: ({ palette }) => palette.action.hover },
                                        '& > td': { border: 'none' }
                                    }}>
                                        {bodyRow(i + 1, row)}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            <Stack justifyContent='space-between' sx={{ px: 2, overflow: 'auto', flexWrap: 'wrap' }}>
                <Stack spacing={2} sx={{ py: 1, width: 'fit-content' }}>
                    <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }} > Row Per Page : </Typography>
                    <TextField
                        value={rowsPerPage}
                        select
                        onChange={handleChangeRowsPerPage}
                        fullWidth={false}
                        size='small'
                        variant='standard'
                    >
                        <MenuItem value={5} > 5 </MenuItem>
                        <MenuItem value={10} > 10 </MenuItem>
                        <MenuItem value={15} > 15 </MenuItem>
                        <MenuItem value={20} > 20 </MenuItem>
                        <MenuItem value={25} > 25 </MenuItem>
                    </TextField>
                </Stack>
                <Pagination
                    sx={{ py: 1, '& > ul': { flexWrap: 'nowrap' } }}
                    color='primary'
                    variant='outlined'
                    showFirstButton
                    showLastButton
                    count={(Math.floor(data.length / rowsPerPage))}
                    page={page + 1}
                    onChange={handleChangePage}
                />
            </Stack>
        </>
    );
}