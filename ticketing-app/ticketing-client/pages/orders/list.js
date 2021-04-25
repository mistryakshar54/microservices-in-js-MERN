
import Layout from '../../UI/layout';
import { useRouter } from 'next/router';

const OrderList =  function({orders}) {
  const router = useRouter();
  
  const renderOrderByStatus = (status, text) => {
      const filteredOrder = orders.filter( order => order.status ===  status );

      return(
        filteredOrder.length > 0 ?
        <div key={status} className='list'>
        <h1 className='content-title'>{text}</h1>
        { filteredOrder.map ( order => <div key={order.id} className='listItem'>
          <span>
              { `${order.ticket.title} - ${order.ticket.price} $` }<br/>
              {order.status}
          </span>
          <a onClick={() => viewOrderDetails(order.id)}>View Details</a>
          </div>) }
      </div> : null
      );
  }
  const viewOrderDetails = async(orderId) => {
   router.push(`/orders/${orderId}`);
  }
  return (
    <Layout>
    <h1 className='content-title'>Your Orders</h1>
      {
        orders?.length > 0 ?
        <>
            {renderOrderByStatus('created','Pending')}
            {/* {renderOrderByStatus('completed','Completed')} */}
            {renderOrderByStatus('cancelled','Cancelled')}
        </>
      : <h1 className='content-title'>No orders to display</h1>
      }
    </Layout>
  )
}
OrderList.getInitialProps = async(context, client) => {
  const { data } = await client.get('/api/orders');
  const orders = data.data;
  return { orders };
}
export default OrderList;
