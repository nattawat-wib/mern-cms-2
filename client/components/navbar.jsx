import { Divider, Tooltip, AppBar, Avatar, Badge, Button, Box, Container, Stack, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import Link from 'next/Link'
import Image from 'next/image';

import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SettingsIcon from '@mui/icons-material/Settings';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';

import axios from '../utils/axios';
import { useState } from 'react';

import { StyledAppBar } from '../styles/navbar.style';
import { useThemeContext } from '../context/theme-context';

export default function Navbar() {
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();
    const [profileMenuParent, setProfileMenuParent] = useState(null);
    const [notiMenuParent, setNotiMenuParent] = useState(null);

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
                        <Tooltip title='your profile' arrow>
                            <Avatar
                                onClick={e => setProfileMenuParent(e.target)}
                                sx={{ width: 36, height: 36, cursor: 'pointer' }}
                            />
                        </Tooltip>
                        <Menu
                            onClick={() => setProfileMenuParent(null)}
                            anchorEl={profileMenuParent}
                            open={!!profileMenuParent}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            sx={{ mt: 2 }}
                        >
                            <MenuItem dense>
                                <ListItemIcon> <PersonIcon /> </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem dense>
                                <ListItemIcon> <DesignServicesIcon /> </ListItemIcon>
                                Daft
                            </MenuItem>
                            <MenuItem dense>
                                <ListItemIcon> <NewspaperIcon /> </ListItemIcon>
                                My Post
                            </MenuItem>
                            <MenuItem dense>
                                <ListItemIcon> <SettingsIcon /> </ListItemIcon>
                                Setting
                            </MenuItem>
                            <Divider />
                            <Button size='small' color='error' fullWidth> Logout </Button>
                        </Menu>
                        <Tooltip title='notification' arrow>
                            <IconButton
                                sx={{ bgcolor: ({ palette }) => palette.grey[isDarkTheme ? 800 : 200] }}
                                onClick={e => setNotiMenuParent(e.target)}
                            >
                                <Badge badgeContent={2} color='error'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            onClick={() => setNotiMenuParent(null)}
                            anchorEl={notiMenuParent}
                            open={!!notiMenuParent}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            sx={{ mt: 2, '.MuiPaper-root': { maxWidth: 400 } }}
                        >
                            {
                                new Array(5).fill(1).map(noti => {
                                    return (
                                        <MenuItem dense key={Math.random()}>
                                            <ListItemIcon>
                                                <Avatar
                                                    onClick={e => setProfileMenuParent(e.target)}
                                                    sx={{ width: 25, height: 25, cursor: 'pointer' }}
                                                />
                                            </ListItemIcon>
                                            <span className='whitespace-normal line-clamp-2'>
                                                <b> tester </b> clap to your post "Lorem Ipsum eiei eiei Lorem Ipsum eiei eiei Lorem Ipsum eiei eiei Lorem Ipsum eiei eiei  eiei eiei Lorem Ipsum eiei eiei Lorem Ipsum eiei eiei Lorem Ipsum eiei eiei"
                                            </span>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                        <Tooltip title='change theme' arrow>
                            <IconButton
                                sx={{ bgcolor: ({ palette }) => palette.grey[isDarkTheme ? 800 : 200] }}
                                onClick={() => setIsDarkTheme(prev => !prev)}
                            >
                                {isDarkTheme ? <DarkModeIcon /> : <Brightness6Icon />}
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Container >
        </StyledAppBar >
    )
}