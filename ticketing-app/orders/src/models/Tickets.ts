import { OrderStatus } from '@amdevcorp/ticketing-common';
import mongoose from 'mongoose';
import { Order } from './Orders';

type ticketAttributes = {
    title : string;
    price : number;
}

export interface TicketDoc extends mongoose.Document{
    title : string;
    price : number;
    isReserved() : Promise<boolean>;
}
interface TicketModel extends mongoose.Model<TicketDoc>{
    buildTicket( attr : ticketAttributes ) : TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min : 0
    }
},{
    toJSON : {
        transform( doc , ret ){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

ticketSchema.statics.buildTicket = ( attr : ticketAttributes ) => new Ticket(attr);
ticketSchema.methods.isReserved = async function(){
    const reservedTicket = await Order.findOne({ 
        ticket : this,
        status: {
            $in:[
                OrderStatus.CREATED,
                OrderStatus.COMPLETE,
                OrderStatus.AWAITING_PAYMENT
            ]
        },
     });
    return !!reserve dTicket;
}

const Ticket = mongoose.model<TicketDoc , TicketModel>('Ticket', ticketSchema);


export { Ticket };