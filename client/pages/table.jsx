import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';

import { useState } from 'react';
import CustomTable from './../components/custom-table';
import axios from './../utils/axios';

export async function getServerSideProps(context) {
    const user = await axios('get', 'https://jsonplaceholder.typicode.com/users');

    return {
        props: { user: user.data }
    }
}

export default function Table(prop) {
    const bodyRow = (i, data) => {
        return (
            <>
                <TableCell> {i} </TableCell>
                <TableCell> {data.username} </TableCell>
                <TableCell> {data.name} </TableCell>
                <TableCell> {data.email} </TableCell>
                <TableCell align='right'> {data.phone} </TableCell>
                <TableCell> {data.address.city} </TableCell>
            </>
        )
    }

    const headColumn = [
        { label: '#', sortKey: null},
        { label: 'username', sortKey: 'username'},
        { label: 'name', sortKey: 'name'},
        { label: 'email', sortKey: 'email'},
        { label: 'phone', sortKey: 'phone', align: 'right', },
        { label: 'address', sortKey: 'address'},
    ]

    return (
        <Box sx={{ p: 4 }} >
            <Paper elevation={8}>
                <CustomTable
                    data={[...prop.user, ...prop.user, ...prop.user, ...prop.user]}
                    headColumn={headColumn}
                    bodyRow={bodyRow}
                />
            </Paper>
        </Box>
    )
}