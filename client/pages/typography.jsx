import { Container, Divider, Typography } from '@mui/material'
import React from 'react'

export default function TypographyPage() {
    return (
        <Container maxWidth='md' sx={{ my: 4 }}>
            <Typography align='center' component='span' className='block text-4xl' > Typography </Typography>

            <Typography variant='h1'> h1 (h1) </Typography>
            <Typography variant='h2'> h2 (h2) </Typography>
            <Typography variant='h3'> h3 (h3) </Typography>
            <Typography variant='h4'> h4 (h4) </Typography>
            <Typography variant='h5'> h5 (h5) </Typography>
            <Typography variant='h6'> h6 (h6) </Typography>
            <Typography variant='button'> button (span) </Typography> <br />
            <Typography variant='caption'> caption (span) </Typography>
            <Typography variant='body1'> body1 (p) </Typography>
            <Typography variant='body2'> body2 (p) </Typography>
            <Typography variant='overline'> overline (span) </Typography>
            <Typography variant='subtitle1'> subtitle1 (h6) </Typography>
            <Typography variant='subtitle2'> subtitle2 (h6) </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant='h6'> - always use </Typography>
            <Typography> default custom (span) font-size: 1rem||16px font-weight: 400  </Typography>
            <Typography paragraph> props paragraph (p + mb) </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant='h6'> - different variant and component </Typography>
            <Typography variant='h6' component='span'> variant: h6, component: span </Typography>
            <Typography variant='overline' component='h1'> variant: overline, component: h1 </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant='h6'> - color </Typography>
            <Typography variant='h6' component='span' color='primary'> primary </Typography>
            <Typography variant='h6' component='span' color='primary.dark'> primary.dark </Typography>
            <Typography variant='h6' component='span' color='secondary'> secondary </Typography>
            <Typography variant='h6' component='span' color='error'> error </Typography>
            <Typography variant='h6' component='span' color='warning.light'> warning.light </Typography>
            <Typography variant='h6' component='span' color='grey.500'> grey.500 </Typography>
            <Typography variant='h6' component='span' color='text.primary'> text.primary </Typography>
            <Typography variant='h6' component='span' color='text.secondary'> text.secondary </Typography>
            <Typography variant='h6' component='span' color='text.disabled'> text.disabled </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant='h6'> - tailwinds </Typography>
            <Typography paragraph className='text-[50px] lg:text-[12px]'> text-[50px] lg:text-[12px] </Typography>
            <Typography paragraph className='font-bold'> font-bold </Typography>
            <Typography variant='h1' className='font-thin'> h1 font-thin </Typography>
        </Container>
    )
}
