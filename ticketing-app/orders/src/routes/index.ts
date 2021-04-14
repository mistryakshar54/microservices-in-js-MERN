import { OrderCancelledPublisher } from './../events/order-cancelled-publisher';
import { Router, Request , Response } from 'express';
import { body, param } from 'express-validator';
import { validationHandler, requireAuth, BadRequestError , NotFoundError, NotAuthorizedError, OrderStatus } from '@amdevcorp/ticketing-common';
import { Order } from '../models/Orders';
import { Ticket } from '../models/Tickets';
import mongo from 'mongodb';
import { OrderCreatedPublisher } from '../events/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import mongoose from 'mongoose';

const router = Router();

router.post( '/orders', requireAuth,[
 body('ticketId').notEmpty().custom((input : string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Valid ticketId is required'),
], validationHandler , async(req : Request , res : Response) => {
    const { ticketId } = req.body;
    const ObjId = mongo.ObjectID;
    if(! ObjId.isValid(ticketId) ){
        throw new BadRequestError('Invalid ticket id');
    }
    const ticket = await Ticket.findById(ticketId);
    if(!ticket){
        throw new NotFoundError(`Ticket id : ${ticketId} not found`);
    }
    const reservedTicket = await ticket.isReserved();
    if(reservedTicket){
        throw new BadRequestError(`Ticket is already reserved`);
    }
    const expiration = new Date();
    expiration.setSeconds( expiration.getSeconds() + (1 * 60) );
    const order = await Order.buildOrder({
        userId : req.currentUser!.id,
        status : OrderStatus.CREATED,
        expiresAt : expiration,
        ticket
    })
    await order.save();
    try{
       await new OrderCreatedPublisher(natsWrapper.client).publish({
            id : order.id,
            status : order.status,
            expiresAt : order.expiresAt.toISOString(),
            ticket : {
                id : ticket.id,
                price : ticket.price,
                version : order.ticket.version,
            },
            userId : order.userId,
        })
    }
    catch(err){
        console.log(err);
        throw new BadRequestError(err);
    }
    res.status(201).send({message : 'success', data :  order});
});

router.get( '/orders/:id',[
 param('id').notEmpty().withMessage('Order id is needed')
], validationHandler , async(req : Request , res : Response) => {
    const orderID = req.params.id
    const ObjId = mongo.ObjectID;
    if(! ObjId.isValid(orderID) ){
        throw new BadRequestError('Invalid order id');
    }
    const order = await Order.findById(orderID);
    if(!order){
        throw new NotFoundError(`Order id : ${orderID} not found`);
    }
    res.status(200).send({message : 'success', data :  order});
});

router.get( '/orders', requireAuth, async(req : Request , res : Response) => {
    console.log("Came here");
    const orders = await Order.find({ userId : req.currentUser!.id}).populate('ticket') || [];
    res.status(200).send({message : 'success', data :  orders});
});

router.delete( '/orders/:id',requireAuth,[
    param('id').notEmpty().withMessage('Order id is needed')
   ], validationHandler , async(req : Request , res : Response) => {
       const orderID = req.params.id
       const ObjId = mongo.ObjectID;
       if(! ObjId.isValid(orderID) ){
           throw new BadRequestError('Invalid order id');
       }
       const order = await Order.findById(orderID).populate('ticket');
       if(!order){
           throw new NotFoundError(`Order id : ${orderID} not found`);
       }
       if( order.userId != req.currentUser!.id){
            throw new NotAuthorizedError();
       }
       order.status = OrderStatus.CANCELLED;
       await order.save()
       try{
        await new OrderCancelledPublisher(natsWrapper.client).publish({
             id : order.id,
             ticket : {
                id : order.ticket.id,
                price : order.ticket.price,
                version : order.ticket.version,
             },
         })
     }
     catch(err){
         console.log(err);
         throw new BadRequestError(err);
     }
       res.status(204).send({message : 'success', data :  order});
   });

export {router as orderRoutes};