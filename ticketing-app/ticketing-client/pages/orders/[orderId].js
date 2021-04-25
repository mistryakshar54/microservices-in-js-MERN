
import Layout from '../../UI/layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ViewOrder = ({order}) => {
    const [timeLeft, setTimeLeft] = useState(1);  
    const router = useRouter();
    let intervalId = null;
    useEffect(() => {
        if(order.status === 'created'){
            const findTimeLeft = () => {
                const msLeft = new Date(order.expiresAt) - new Date();
                const remaining = Math.round( msLeft / 1000 )
                if(remaining <= 0){
                    console.log("Nothing  remaining!!",intervalId);
                    clearInterval(intervalId);
                }
                setTimeLeft( remaining ) 
            }
            findTimeLeft();
            intervalId = setInterval(findTimeLeft , 1000);
            return()=>{
                clearInterval(intervalId);
            }
        }
    }, [])
    useEffect(() => {
        if(timeLeft === 0){
            clearInterval(intervalId);
            router.push(`/orders/${order.id}`);
        }
    }, [timeLeft])
    const renderContentBasedOnStatus = ( order ) => {
        switch(order.status){
            case 'cancelled':{
                return(
                <>
                    <h3 className='content-info-title'>Your order has  been cancelled.</h3>
                </>)
            }
            default:{
                return(
                <>
                    {(order.status === 'created') ? <h3 className='content-info-title'>Your order will expire in {timeLeft} seconds</h3> : null}
                </>)
            } 
        }
    }
    return (
        <Layout>
            <h1 className='content-title'>Order Details</h1>
            {
                order ? 
                <>
                    <h3 className='content-info-title'>Order Id : {order.id}</h3>
                    <h3 className='content-info-title'>Title : {order.ticket.title}</h3>
                    <h3 className='content-info-title'>Price : {order.ticket.price}$</h3>
                    <h3 className='content-info-title'>Current Status : {order.status}</h3>
                    {renderContentBasedOnStatus(order)}
                    
                </>
                : <h1 className='content-title'>No such order</h1>
            } 
        </Layout>
      )
};

ViewOrder.getInitialProps = async(context, client, currentUser) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    const order = data.data;
    return { order, currentUser};
}
export default ViewOrder;