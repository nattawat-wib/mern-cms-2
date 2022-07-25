import { IconButton, Button, Typography, Grid, Paper, Box, Stack } from '@mui/material';
import Image from 'next/image';

import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';

export default function PostCard(post) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <Stack spacing={1}>
                    <Image
                        src='https://data.whicdn.com/images/51721845/original.jpg'
                        className='rounded-full'
                        width={30}
                        height={30}
                        objectFit='cover'
                    />
                    <Typography paragraph component='span'> nutella tester </Typography>
                    <Typography className='text-xs' sx={{ color: ({ palette }) => palette.grey[500] }}> - 10/02/2022 </Typography>
                </Stack>

                {/* title */}
                <Typography paragraph component='span' className='font-bold line-clamp-2 mt-2 mb-0'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat eum facere molestias omnis maxime iste ab, ipsam eos aliquid. Ipsum at accusamus voluptatibus soluta dolore consequuntur ut numquam facilis. Minima.
                </Typography>

                {/* desc */}
                <Typography paragraph component='span' className='md:line-clamp-3 hidden md:block mt-1 mb-2'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat eum facere molestias omnis maxime iste ab, ipsam eos aliquid. Ipsum at accusamus voluptatibus soluta dolore consequuntur ut numquam facilis. Minima.
                </Typography>

                {/* card footer */}
                <Stack justifyContent='space-between'>
                    <Box>
                        {
                            new Array(3).fill(1).map(category => {
                                return <Button size='small' variant='outlined' className='mr-1 rounded-full'> #tag </Button>
                            })
                        }
                    </Box>
                    <Stack alignItems='center'>
                        <IconButton size='small'>
                            <BookmarkAddOutlinedIcon sx={{ color: ({ palette }) => palette.grey[500] }} />
                        </IconButton>
                        <SignLanguageIcon sx={{ mx: .5, fontSize: 16, color: ({ palette }) => palette.grey[500] }} />
                        <Typography sx={{ mt: 1, fontSize: 13 }}> 122 </Typography>
                    </Stack>
                </Stack>

            </Grid>
            <Grid item xs={3} className='flex justify-center items-center'>
                <Image
                    src='https://data.whicdn.com/images/51721845/original.jpg'
                    className='rounded-md'
                    width={120}
                    height={120}
                    objectFit='cover'
                />
            </Grid>
        </Grid>
    )
}