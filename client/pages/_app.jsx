import './../styles/globals.scss';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';

import ThemeContextProvider from '../context/theme-context';
import { Toaster } from 'react-hot-toast';
import DialogConfirm from '../components/dialog-confirm';
import Loader from '../components/loader';
import Navbar from './../components/navbar';
import Meta from './../components/meta';

function MyApp({ Component, pageProps }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeContextProvider>
                <Meta />
                <Navbar />
                <Toaster />
                <Loader />
                <CssBaseline />
                <DialogConfirm />
                <Component {...pageProps} />
            </ThemeContextProvider>
        </LocalizationProvider>
    )
}

export default MyApp