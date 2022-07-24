import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const TrendingNumber = styled(Typography)`
    font-size: 25px;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.grey[400]}
`