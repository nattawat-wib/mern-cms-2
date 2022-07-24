import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function Loader() {

    NProgress.configure({
        showSpinner: false
    })

    Router.events.on('routeChangeStart', NProgress.start)
    Router.events.on('routeChangeComplete', NProgress.done)
    Router.events.on('routeChangeError', NProgress.done)

    return (<></>)
}
