
import Layout from '../../UI/layout';

const ViewTicket = ({ticket, currentUser}) => {
    
    return (
        <Layout>
            <h1 className='content-title'>Ticket Details</h1>
            {
                ticket ? <>
                <h3 className='content-info-title'>Title : {ticket.title}</h3>
                <h3 className='content-info-title'>Price : {ticket.price}$</h3>
                </>
                : <h1 className='content-title'>No such ticket</h1>
            } 
        </Layout>
      )
};

ViewTicket.getInitialProps = async(context, client, currentUser) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    const ticket = data.data;
    return { ticket, currentUser};
}
export default ViewTicket;