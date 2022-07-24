import { AppBar, Stack, IconButton } from '@mui/material'
import Link from 'next/Link'

import axios from '../utils/axios';

import { useThemeContext } from '../context/theme-context';

export default function Navbar() {
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();

    return (
        <AppBar sx={{ p: 1, zIndex: 1030 }} position='sticky'>
            <Stack justifyContent='center' spacing={2} >
                <Link href='/'>
                    <a> Home </a>
                </Link>
                <Link href='/table'>
                    <a> Table </a>
                </Link>
                <Link href='/form'>
                    <a> Form </a>
                </Link>
                <Link href='/control-panel'>
                    <a> Control panel </a>
                </Link>
                <Link href='/typography'>
                    <a> Typography </a>
                </Link>
                <IconButton onClick={() => setIsDarkTheme(prev => !prev)}>
                </IconButton>
            </Stack>
        </AppBar>
    )
}