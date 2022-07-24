import Head from 'next/Head';
import { useRouter } from 'next/router';
import pageConfig from './../data/page-config.json';

export default function Meta() {
    const { asPath } = useRouter();

    return (
        <Head>
            <title> {pageConfig[asPath].title || ''} </title>
            <link rel="canonical" href='http://localhost' />
            <meta name="language" content='en' />
            <meta name="description" content={pageConfig[asPath].desc} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}
