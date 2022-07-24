import { Typography, Box, TableCell } from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { useState } from 'react';
import Sidebar from './../components/sidebar';
import CustomTable from './../components/custom-table';
import axios from './../utils/axios';

export async function getServerSideProps(context) {
    const user = await axios('get', 'https://jsonplaceholder.typicode.com/users');

    return {
        props: { user: user.data }
    }
}

export default function ControlPanel(prop) {
    const [open, setOpen] = useState(true);
    const menuList = [
        { label: 'Dashboard', href: '/control-panel', icon: <SettingsOutlinedIcon /> },
        { label: 'Home', href: '/', icon: <HomeOutlinedIcon /> },
        { label: 'Table', href: '/table', icon: <TableChartOutlinedIcon /> },
        { label: 'Form', href: '/form', icon: <ArticleOutlinedIcon />, },
        {
            label: 'Sub menu', href: '#', icon: <ArticleOutlinedIcon />, children: [
                { label: 'menu 1', href: '#', icon: <SettingsOutlinedIcon /> },
                { label: 'menu 2', href: '#', icon: <HomeOutlinedIcon /> },
                { label: 'menu 3', href: '#', icon: <TableChartOutlinedIcon /> },
            ]
        },
    ]

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
        { label: '#', sortKey: null },
        { label: 'username', sortKey: 'username' },
        { label: 'name', sortKey: 'name' },
        { label: 'email', sortKey: 'email' },
        { label: 'phone', sortKey: 'phone', align: 'right', },
        { label: 'address', sortKey: 'address' },
    ]

    return (
        <>
            <Sidebar
                open={open}
                setOpen={setOpen}
                menuList={menuList}
            />
            <Box component='main' sx={{ p: 4, ml: 'auto', transition: '.3s ease', width: `calc(100% - ${open ? '75px' : '240px'})` }}>
                <Typography> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam molestias autem perferendis incidunt neque porro officiis assumenda, eius fugiat nesciunt mollitia, eum excepturi. Quia nam sapiente fugit pariatur blanditiis nesciunt. </Typography>
                <CustomTable
                    data={[...prop.user, ...prop.user, ...prop.user, ...prop.user]}
                    headColumn={headColumn}
                    bodyRow={bodyRow}
                />
            </Box>
        </>
    )
}
