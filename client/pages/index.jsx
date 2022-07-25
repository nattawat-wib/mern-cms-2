import { Divider, Avatar, Button, Box, TextField, Stack, InputAdornment, Container, Typography, Grid } from '@mui/material'

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';

import Link from 'next/Link';
import axios from '../utils/axios';

import { TrendingNumber } from './../styles/index.style';
import PostCard from '../components/post-card';

export default function Home() {

    return (
        <>
            <Container sx={{ my: 4 }}>
                <Stack alignItems='center' sx={{ mb: 2 }}>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    <Typography className='font-bold'> TRENDING ON MEDIUM </Typography>
                </Stack>
                <Grid container spacing={4}>
                    {
                        new Array(6).fill(1).map((post, i) => {
                            return (
                                <Grid
                                    item
                                    xs={12} sm={6} md={4}
                                    className='flex item-start'
                                    key={Math.random()}
                                >
                                    <TrendingNumber> 0{i + 1} </TrendingNumber>
                                    <Box sx={{ ml: 2, my: 1 }}>
                                        <Link href='/'>
                                            <a>
                                                <Stack>
                                                    <Avatar sx={{ width: 20, height: 20, mr: 1 }} />
                                                    <Typography> nutella tester </Typography>
                                                </Stack>
                                            </a>
                                        </Link>
                                        <Link href='/'>
                                            <a>
                                                <Typography className='font-bold line-clamp-2 my-3'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod optio ullam aspernatur iure dolor voluptate molestias iusto omnis eligendi eaque quisquam quaerat unde veritatis sit aut, minus itaque, id facilis. </Typography>
                                            </a>
                                        </Link>
                                        <Stack justifyContent='space-between' spacing={2}>
                                            <Typography component='small'> 10/02/2021 </Typography>
                                            <Box>
                                                <SignLanguageIcon sx={{ fontSize: 14, color: ({ palette }) => palette.grey[500] }} />
                                                <Typography component='small'> 12 </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Divider sx={{ my: 8 }} />
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8}>
                        {
                            new Array(12).fill(1).map(category => {
                                return (
                                    <Box key={Math.random()}>
                                        <PostCard />
                                        <Divider sx={{ my: 4 }} />
                                    </Box>
                                )
                            })
                        }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className='sticky top-24'>
                            <Typography className='font-bold'>  DISCOVER MORE OF WHAT MATTERS TO YOU </Typography>
                            <br />
                            <br />
                            <Typography className='block mb-2'> Category </Typography>
                            {
                                new Array(12).fill(1).map(category => {
                                    return (
                                        <Link href='/' key={Math.random()}>
                                            <a>
                                                <Button variant='text' sx={{ mr: 1, mb: 1 }}> category </Button>
                                            </a>
                                        </Link>
                                    )
                                })
                            }
                            <Divider sx={{ my: 2 }} />
                            <Typography className='block mb-2'> Tag </Typography>
                            {
                                new Array(12).fill(1).map(category => {
                                    return (
                                        <Link href='/' key={Math.random()}>
                                            <a>
                                                <Button variant='outlined' className='rounded-full' sx={{ mr: 1, mb: 1 }}> #category </Button>
                                            </a>
                                        </Link>
                                    )
                                })
                            }

                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}