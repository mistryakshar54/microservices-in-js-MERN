import Head from 'next/head';
import Header from './header/header';
import { useRouter } from "next/router";

const routeHeaders = {
    '/' : { title : 'Home' },
    '/auth/signin' : { title : 'Sign In' },
    '/auth/signup' : { title : 'Sign Up' },
}
export default ({children}) => {
    const router = useRouter();
    console.log('Routes: ', router.pathname);
return <div style={ { margin : '0', padding : '0'} } className="container-fluid">
    <Head>
        <title>{ routeHeaders[router.pathname]?.title }</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* <Header/> */}
    {children}
    </div>
}