import { TicketUpdatedPublisher } from './../events/ticket-update-publisher';
import { Router, Request , Response } from 'express';
import { body, param } from 'express-validator';
import { validationHandler, requireAuth, BadRequestError , NotFoundError, NotAuthorizedError, OrderStatus } from '@amdevcorp/ticketing-common';
import { Order } from '../models/Orders';
import { Ticket } from '../models/Tickets';
import mongo from 'mongodb';
import { TicketCreatedPublisher } from '../events/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import mongoose from 'mongoose';

const router = Router();

router.post( '/tickets', requireAuth,[
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
        throw new NotFoundError(`Ticket is already reserved`);
    }
    const expiration = new Date();
    expiration.setSeconds( expiration.getSeconds() + (15 * 60) );
    const order = await Order.buildOrder({
        userId : req.currentUser!.id,
        status : OrderStatus.CREATED,
        expiresAt : expiration,
        ticket
    })
    await order.save();
    // try{
    //    await new TicketCreatedPublisher(natsWrapper.client).publish({
    //         id : ticket.id,
    //         title : ticket.title,
    //         price: ticket.price,
    //         userId : ticket.userId
    //     })
    // }
    // catch(err){
    //     console.log(err);
    //     throw new BadRequestError(err);
    // }
    res.status(201).send({message : 'success', data :  ticket});
});

// router.get( '/tickets/:id',[
//  param('id').notEmpty().withMessage('Ticket id is needed')
// ], validationHandler , async(req : Request , res : Response) => {
//     const ticketID = req.params.id
//     const ObjId = mongo.ObjectID;
//     if(! ObjId.isValid(ticketID) ){
//         throw new BadRequestError('Invalid ticket id');
//     }
//     const ticket = await Ticket.findById(ticketID);
//     if(!ticket){
//         throw new NotFoundError(`Ticket id : ${ticketID} not found`);
//     }
//     res.status(200).send({message : 'success', data :  ticket});
// });

// router.get( '/tickets', async(req : Request , res : Response) => {
//     const tickets = await Ticket.find({}) || [];
//     res.status(200).send({message : 'success', data :  tickets});
// });

// router.put( '/tickets/:id', requireAuth,[
//     body('title').notEmpty().withMessage('Title is required'),
//     body('price').isFloat({ gt : 0 }).withMessage('Price must be greater than 0')   
//    ], validationHandler , async(req : Request , res : Response) => {
//     const ticketID = req.params.id
//     const ObjId = mongo.ObjectID;
//     if(! ObjId.isValid(ticketID) ){
//         throw new BadRequestError('Invalid ticket id');
//     }
//     const ticket = await Ticket.findById(ticketID);
//     if(!ticket){
//         throw new NotFoundError(`Ticket id : ${ticketID} not found`);
//     }
//     if(ticket.userId != req.currentUser!.id){
//         throw new NotAuthorizedError();
//     }
//     ticket.set({title : req.body.title, price : req.body.price})
//     ticket.save();

//     new TicketUpdatedPublisher(natsWrapper.client).publish({
//         id : ticket.id,
//         title : ticket.title,
//         price: ticket.price,
//         userId : ticket.userId
//     });

//     res.status(200).send({message : 'success', data :  ticket});
//    });

export {router as orderRoutes};