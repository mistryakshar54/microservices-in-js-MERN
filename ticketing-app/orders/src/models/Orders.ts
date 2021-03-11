import { OrderStatus } from '@amdevcorp/ticketing-common';
import mongoose from 'mongoose';



type orderAttributes = {
    userId : string;
    status : OrderStatus;
    expiresAt : Date;
    ticket : TicketDoc;
}

interface orderDoc extends mongoose.Document{
    userId : string;
    status : orderStatus;
    expiresAt : Date;
    ticket : TicketDoc;
}
interface orderModel extends mongoose.Model<orderDoc>{
    buildOrder( attr : orderAttributes ) : orderDoc;
}

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required: true
    },
    status : {
        type : String,
        required: true,
        enum : Object.values(OrderStatus)
    },
    expiresAt:{
        type: mongoose.Schema.Types.Date
    },
    ticketId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
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

orderSchema.statics.buildorder = ( attr : orderAttributes ) => new Order(attr);

const Order = mongoose.model<orderDoc , orderModel>('Order', orderSchema);


export { Order };