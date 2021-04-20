import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@amdevcorp/ticketing-common';

type orderAttributes = {
    id : string;
    version : number;
    price : number;
    userId : string;
    status : OrderStatus;
}

//List all props that the order doc has
interface OrderDoc extends mongoose.Document{  
    price : number;
    userId : string;
    version : number;
    status : OrderStatus;
}
interface OrderModel extends mongoose.Model<OrderDoc>{
    buildOrder( attr : orderAttributes ) : OrderDoc;
}

const orderSchema = new mongoose.Schema({
    price:{
        type: Number,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
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

orderSchema.set('versionKey','version');   //rename order schema __v => version
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.buildOrder = ( attr : orderAttributes ) => new Order({
    _id : attr.id,
    price : attr.price,
    userId : attr.userId,
    status : attr.status,
    version : attr.version
});

const Order = mongoose.model<OrderDoc , OrderModel>('Order', orderSchema);


export { Order };