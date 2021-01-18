import 'bootstrap/dist/css/bootstrap.min.css'
import buildClient from '../apis/build-context';
import Header from '../UI/header/header';

function MyApp({ Component, pageProps, currentUser }) {
    return <><Header currentUser={currentUser}/><Component currentUser={currentUser} {...pageProps} /></>
  }
  
  MyApp.getInitialProps = async( appContext ) => {
  let client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentUser');

  let pageProps = {};
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {pageProps , ...data};
}

  export default MyApp
  