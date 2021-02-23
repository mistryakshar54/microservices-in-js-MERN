import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

type ticketAttributes = {
    title : string;
    price : number;
    userId : string;
}

interface TicketDoc extends mongoose.Document{
    title : string;
    price : number;
    userId : string;
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
        type: Number,
        required: true
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

ticketSchema.pre( 'save', async function( done ) {
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash( this.get('password'), salt)
        this.set('password', hashedPwd  ) ;
    }
    done();
} )

ticketSchema.statics.buildTicket = ( attr : ticketAttributes ) => new Ticket(attr);

const Ticket = mongoose.model<TicketDoc , TicketModel>('Ticket', ticketSchema);


export { Ticket };