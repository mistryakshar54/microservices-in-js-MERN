import { OrderStatus } from '@amdevcorp/ticketing-common';
import mongoose from 'mongoose';
import { Order } from './Orders';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

type ticketAttributes = {
    id : string;
    title : string;
    price : number;
}

export interface TicketDoc extends mongoose.Document{
    title : string;
    price : number;
    version : number;
    isReserved() : Promise<boolean>;
}
interface TicketModel extends mongoose.Model<TicketDoc>{
    buildTicket( attr : ticketAttributes ) : TicketDoc;
    findEvent( id : string , version : number ) : Promise<TicketDoc> | null;
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
        versionKey: true
    }
});

ticketSchema.statics.buildTicket = ( attr : ticketAttributes ) => new Ticket(
    {_id : attr.id, title : attr.title , price : attr.price}
);

ticketSchema.statics.findEvent = ( id : string , version : number ) => {
    return Ticket.findOne({
        _id : id,
        version : version - 1,
     });
};

ticketSchema.methods.isReserved = async function(){
    const reservedTicket = await Order.findOne({ 
        //@ts-ignore
        ticket : this,
        status: {
            $in:[
                OrderStatus.CREATED,
                OrderStatus.COMPLETE,
                OrderStatus.AWAITING_PAYMENT
            ]
        },
     });
    return !!reservedTicket;
}
ticketSchema.set('versionKey','version');   //rename ticket schema __v => version
ticketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<TicketDoc , TicketModel>('Ticket', ticketSchema);


export { Ticket };