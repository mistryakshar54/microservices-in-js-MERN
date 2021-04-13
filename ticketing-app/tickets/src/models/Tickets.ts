import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
type ticketAttributes = {
    title : string;
    price : number;
    userId : string;
}

//List all props that the ticket doc has
interface TicketDoc extends mongoose.Document{  
    title : string; 
    price : number;
    userId : string;
    version : number;
    orderId? : string;
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
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    orderId:{
        type: String,
        required: false
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

ticketSchema.pre( 'save', async function( done ) {
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash( this.get('password'), salt)
        this.set('password', hashedPwd  ) ;
    }
    done();
} )
ticketSchema.set('versionKey','version');   //rename ticket schema __v => version
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.buildTicket = ( attr : ticketAttributes ) => new Ticket(attr);

const Ticket = mongoose.model<TicketDoc , TicketModel>('Ticket', ticketSchema);


export { Ticket };