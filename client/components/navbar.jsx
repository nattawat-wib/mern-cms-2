import { AppBar, Avatar, Badge, Button, Box, Container, Stack, IconButton } from '@mui/material'
import Link from 'next/Link'
import Image from 'next/image';

import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';

import axios from '../utils/axios';

import { StyledAppBar } from '../styles/navbar.style';
import { useThemeContext } from '../context/theme-context';

export default function Navbar() {
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();

    return (
        <StyledAppBar sx={{ p: 1, zIndex: 1030 }} position='sticky'>
            <Container>
                <Stack justifyContent='space-between' alignItems='center' className='w-full' spacing={2} >
                    <Link href="/" style={{ height: '45px' }}>
                        <a>
                            <Image src='/logo.png' width={170} height={45} style={{ filter: `invert(${isDarkTheme ? 90 : 0}%)` }} />
                        </a>
                    </Link>
                    <Stack spacing={1}>
                        <Button variant='outlined' className='rounded-full'> Write Something </Button>
                        <Avatar sx={{ width: 36, height: 36 }} />
                        <IconButton sx={{ bgcolor: ({ palette }) => palette.grey[isDarkTheme ? 800 : 200] }}>
                            <Badge badgeContent={2} color='error'>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={{ bgcolor: ({ palette }) => palette.grey[isDarkTheme ? 800 : 200] }}
                            onClick={() => setIsDarkTheme(prev => !prev)}
                        >
                            {isDarkTheme ? <DarkModeIcon /> : <Brightness6Icon />}
                        </IconButton>
                    </Stack>
                </Stack>
            </Container >
        </StyledAppBar >
    )
}