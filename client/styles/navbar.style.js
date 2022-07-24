import styled from '@emotion/styled';
import { AppBar } from '@mui/material';

export const StyledAppBar = styled(AppBar)`
    background-color: ${({theme}) => theme.palette.nav.bg } ;
    box-shadow: 0 0 24px rgba(0,0,0, .1);
`