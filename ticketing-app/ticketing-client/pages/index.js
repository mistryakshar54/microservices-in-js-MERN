import Layout from '../UI/layout';
import { useRouter } from 'next/router';
import useRequest from '../hooks/useRequest';

const Home =  function({currentUser , tickets}) {
  const router = useRouter();
  const { doResponse , isLoading, errors } = useRequest('/api/orders', 'post' , null, (order)=>{ console.log("order",order) });
  const makePurchase = async(ticketId) => {
   const resp = await doResponse({ticketId});
   const { data } = resp;
   router.push(`/orders/${data.id}`);
  }
  return (
    <Layout>
      {
        tickets?.length > 0 ?
      
      <div className='list'>
        <h1 className='content-title'>Available Tickets</h1>
        { tickets.map ( ticket => <div className='listItem'>
          <span>{ `${ticket.title} - ${ticket.price} $` }</span>
          { 
            !currentUser?
            <a>Signin to purchase</a>
            : <a onClick={() => makePurchase(ticket.id)}>Purchase</a>
          }
          </div>) }
      </div>
      : <h1 className='content-title'>No tickets to display</h1>
      }
    </Layout>
  )
}
Home.getInitialProps = async(context, client,currentUser) => {
  const { data } = await client.get('/api/tickets');
  const tickets = data.data;
  return { tickets };
}
export default Home;
