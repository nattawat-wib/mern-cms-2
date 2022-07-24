import { Button, TextField, Stack, InputAdornment, Container, Typography, Grid } from '@mui/material'
import { DatePicker } from '@mui/lab';

import Link from 'next/Link';

import axios from '../utils/axios';
import { dialogConfirm } from '../components/dialog-confirm';
import { MotionButton, MotionPaper } from '../components/motion-component';

export default function Home() {

    const call = async () => {
        dialogConfirm(true, () => {
            axios('get', 'https://dog.ceo/api/breeds/image/random')
            alert('confirm')
        });
    }

    return (
        <>
            <Container maxWidth='md' sx={{ my: 4 }}>
                <TextField label='username' />
                <Stack alignItems='end'>
                    <TextField variant='standard' label='username' sx={{ ml: 1 }} />
                </Stack>
                <br />
                <br />
                <MotionButton
                    variant='contained'
                    // startIcon={}
                    onClick={call}
                > Call API </MotionButton>

                <br />
                <br />

                <Grid container spacing={4}>
                    {
                        new Array(3).fill(1).map((item, i) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={i}>
                                    <MotionPaper sx={{ p: 2 }} elevation={4} >
                                        <Typography variant='h5' > Title </Typography>
                                        <Typography>
                                            optional SKIPPING OPTIONAL DEPENDENCY: @next/swc-android-arm-eabi@12.2.0 (node_modules/@next/swc-android-arm-eabi):
                                            npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for @next/swc-android-arm-eabi@12.2.0: wanted
                                        </Typography>
                                        <MotionButton
                                            variant='contained'
                                            fullWidth
                                            sx={{ mt: 2 }}
                                        >
                                            Submit
                                        </MotionButton>
                                    </MotionPaper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container >
        </>
    )
}