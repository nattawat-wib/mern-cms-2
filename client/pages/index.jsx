import { Avatar, Button, Box, TextField, Stack, InputAdornment, Container, Typography, Grid } from '@mui/material'

import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import Link from 'next/Link';
import axios from '../utils/axios';

import { TrendingNumber } from './../styles/index.style';

export default function Home() {

    return (
        <>
            <Container sx={{ my: 4 }}>
                <Stack alignItems='center'>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    <Typography className='font-bold'> TRENDING ON MEDIUM </Typography>
                </Stack>
                <Grid container>
                    {
                        new Array(6).fill(1).map((post, i) => {
                            return (
                                <Grid
                                    item
                                    xs={12} sm={6} lg={4}
                                    className='flex'
                                >
                                    <TrendingNumber> 0{i + 1} </TrendingNumber>
                                    <Avatar sx={{ width: 10, height: 10 }} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container >
        </>
    )
}