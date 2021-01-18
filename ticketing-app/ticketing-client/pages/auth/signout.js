import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/router';
import Layout from '../../UI/layout';

export default () => {
    const router = useRouter();
    const { doResponse , isLoading, errors } = useRequest('/api/users/auth/signout', 'post' ,{}, ()=>{ router.push('/'); });
    
    useEffect( ()=> {
      doResponse();
    },[]);
  return (     
    <Layout>Signin Out..</Layout>
  );
};
