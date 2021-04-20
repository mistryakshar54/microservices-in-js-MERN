import { Router, Request , Response } from 'express';
import { body, param } from 'express-validator';
import { OrderStatus, validationHandler, requireAuth, BadRequestError , NotFoundError, NotAuthorizedError } from '@amdevcorp/ticketing-common';
import mongo from 'mongodb';
import { natsWrapper } from '../nats-wrapper';
import { Order } from '../models/Orders';
import { OrderCompletePublisher } from '../events/order-complete-publisher';

const router = Router();

router.post( '/payments', requireAuth,[
 body('token').notEmpty().withMessage('Token is required'),
 body('orderId').notEmpty().withMessage('Order ID is required'),
], validationHandler , async(req : Request , res : Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    
    if(!order){
        throw new NotFoundError(`Order with id ${orderId} not found`);
    }
    
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    
    if(order.status === OrderStatus.CANCELLED){
        throw new BadRequestError('Can not pay for a cancelled order');
    }
    order.set({status : OrderStatus.COMPLETE});

    await order.save();
    try{
        await new OrderCompletePublisher(natsWrapper.client).publish({
             orderId : order.id
         })
     }
     catch(err){
         console.log(err);
         throw new BadRequestError(err);
     }
    res.status(201).send({message : 'success', data :  {order}});
});

export {router as paymentRoutes};