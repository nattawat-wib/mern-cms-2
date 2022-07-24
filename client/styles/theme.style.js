import { createTheme, responsiveFontSizes, experimental_sx as sx } from '@mui/material/styles'

const defaultMui = createTheme({
    typography: {
        fontFamily: 'IBM Plex Sans Thai, sans-serif',
    },
    components: {
        MuiButton: {
            defaultProps: {
                // variant: 'contained',
                style: {
                    textTransform: 'none'
                }
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
                sx: { my: 2 },
                fullWidth: true
            }
        },
        MuiStack: {
            defaultProps: {
                direction: 'row',
                alignItems: 'center'
            }
        },
        MuiTypography: {
            defaultProps: {
                textTransform: 'none',
                variant: 'plain-text'
            },
            styleOverrides: {
                'paragraph': sx({
                    fontSize: { xs: '0.875rem', md: '1rem' }
                })
            }
        },
        MuiModal: {
            styleOverrides: {
                '&.MuiDialog-root': {
                    backgroundColor: 'red'
                }
            }
        }
    },
    // overrides: {
    //     '.MuiTypography-plain-text': {
    //         // '' : {
    //         fontSize: '4rem'
    //         // }
    //     }
    // }
})

const light = responsiveFontSizes(createTheme({
    ...defaultMui,
    palette: {
        mode: 'light',
        primary: {
            main: '#66BFBF',
            contrastText: '#fff'
        },
        iconButton: {
            bg: '#eeeeee',
            color: '#9e9e9e'
            // bg: defaultMui.palette.grey['700'],
            // color: defaultMui.palette.grey['400']
        }
    },
}))

const dark = responsiveFontSizes(createTheme({
    ...defaultMui,
    palette: {
        mode: 'dark',
        primary: {
            main: '#66BFBF',
            contrastText: '#fff'
        },
        iconButton: {
            bg: '#9e9e9e50',
            color: '#eeeeee'
        }
    },
}))

export default {
    light,
    dark
}