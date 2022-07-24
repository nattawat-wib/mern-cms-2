import { Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, IconButton, Stack, Typography, Box, Avatar, Tooltip, Collapse } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import { MenuTwoTone } from '@mui/icons-material';
import { dialogConfirm } from './dialog-confirm';

export default function Sidebar({ open, setOpen, menuList }) {
    const { asPath } = useRouter();

    const Menu = ({ label, icon, href }) => {
        return (
            <StyledTooltip arrow title={label} disableHoverListener={!open} placement='right'>
                <StyledListItem className={asPath === href && 'active'}>
                    <Link href={href}>
                        <a>
                            <Stack spacing={2}>
                                {icon}
                                <Typography variant='inline' noWrap className='sidebar__label' > {label} </Typography>
                            </Stack>
                        </a>
                    </Link>
                </StyledListItem>
            </StyledTooltip>
        )
    }

    const SubMenu = ({ label, icon, children }) => {
        const [isCollapse, setIsCollapse] = useState(false);

        return (
            <>
                <StyledListItem onClick={() => setIsCollapse(prev => !prev)}>
                    <Stack justifyContent='space-between'>
                        <Stack spacing={2}>
                            {icon}
                            <Typography variant='inline' noWrap className='sidebar__label' > {label} </Typography>
                        </Stack>
                        {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Stack>
                </StyledListItem>
                <Collapse
                    in={isCollapse}
                    sx={{
                        pl: open ? 1 : 2,
                        '& .MuiSvgIcon-root': { fontSize: '18px' },
                        '& .MuiTypography-root': { fontSize: '15px' }
                    }}
                >
                    {
                        children?.map(menu => {
                            return <Menu key={menu.label} label={menu.label} href={menu.href} icon={menu.icon} />
                        })
                    }
                </Collapse>
            </>
        )
    }

    return (
        <StyledSidebar variant='permanent' open={open}>
            <List>
                <Stack justifyContent='space-between' spacing={2} sx={{ py: 1, px: 2 }} >
                    {!open && <Typography noWrap className='font-bold' sx={{ color: '#f3f3f3' }} > Control Panel </Typography>}
                    <IconButton onClick={() => setOpen(prev => !prev)} className='ml-auto' >
                        {open ? <MenuIcon /> : <CloseOutlinedIcon />}
                    </IconButton>
                </Stack>
                <Divider sx={{ mx: 2, borderColor: '#f3f3f340' }} />
                <StyledMainMenu>
                    {
                        menuList?.map(menu => {
                            return menu.children ?
                                <SubMenu key={menu.label} label={menu.label} icon={menu.icon} children={menu.children} />
                                :
                                <Menu key={menu.label} label={menu.label} href={menu.href} icon={menu.icon} />
                        })
                    }
                </StyledMainMenu>

                <Box className='absolute bottom-0 w-full'>
                    <Divider sx={{ mt: 2, mx: 2, borderColor: '#f3f3f340' }} />
                    <StyledAdmin>
                        <Stack spacing={1} sx={{ opacity: +!open, transition: '.3s ease' }}>
                            <Avatar />
                            <Box>
                                <Typography className='font-bold line-clamp-1 -mb-1'> {'admin'} </Typography>
                                <Typography className='text-xs line-clamp-1'> role: {'admin'} </Typography>
                            </Box>
                        </Stack>
                        <IconButton
                            onClick={() => {
                                dialogConfirm(true, () => alert('wow you logout'))
                            }}
                            className='absolute right-1'
                        >
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </StyledAdmin>
                </Box>

            </List>
        </StyledSidebar >
    )
}

const StyledSidebar = styled(Drawer)`
    & > .MuiPaper-root {
        background-color: #121212;
        width: ${({ open }) => open ? '75px' : '240px'};
        transition: .3s ease;
        overflow: hidden;
    }

    & .MuiList-root {
        padding: 0;
        height: 100%;
    }

    & .sidebar__label {
        opacity: ${({ open }) => open ? 0 : 1};
        font-weight: 500;
        transform: translateY(${({ open }) => open ? '10px' : '0'});
    }
`

const StyledListItem = styled.div`
    cursor: pointer;
    color: #f3f3f3;
    padding: 10px 15px;
    margin: 2px 10px; 
    border-radius: 7px;
    max-width: 100%;
    transition: .3s ease;

    &:hover, 
    &.active {
        background-color: #fefefe;       
        color: #121212;
        transition: .3s ease;
    }
`

const StyledAdmin = styled(Stack)`
    position: relative;
    padding: 10px 15px;
    margin: 2px 10px; 
    color: #fefefe;
`

const StyledMainMenu = styled(Box)`
    background-color: #191919;
    overflow-Y: auto;
    overflow-X: hidden;
    padding: 10px 0;
    height: calc(100% - 122px);
`

const StyledTooltip = styled(Tooltip)`
    & .MuiTooltip-tooltip {
        background-color: red !important;
        color: #121212;
    }
`