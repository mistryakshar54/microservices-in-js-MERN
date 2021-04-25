import Layout from '../UI/layout';
import Link from 'next/link'
import useRequest from '../hooks/useRequest';

const Home =  function({currentUser , tickets}) {
  const { doResponse , isLoading, errors } = useRequest('/api/orders', 'post' , null, (order)=>{ console.log("order",order) });
  const makePurchase = async(ticketId) => {
   const resp = await doResponse({ticketId});
   console.log('Resp', resp);
  }
  return (
    <Layout>
      {
        tickets?.length > 0 ?
      
      <div className='list'>
        <h1 className='content-title'>Your Tickets</h1>
        { tickets.map ( ticket => <div className='listItem'>
          <span>{ `${ticket.title} - ${ticket.price} $` }</span>
          {/* <Link 
            href={`/tickets/[ticketId]`}
            as={`/tickets/${ticket.id}`}
          >View</Link> */}
          <a onClick={() => makePurchase(ticket.id)}>Purchase</a>
          </div>) }
      </div>
      : <h1>No tickets to display</h1>
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
