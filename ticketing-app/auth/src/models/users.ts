import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

type userAttributes = {
    email : string;
    password: string;
}

interface userDoc extends mongoose.Document{
    email : string;
    password: string;
}
interface UserModel extends mongoose.Model<userDoc>{
    buildUser( attr : userAttributes ) : userDoc;
}

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true
    },
    password:{
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
        versionKey: false
    }
});

userSchema.pre( 'save', async function( done ) {
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash( this.get('password'), salt)
        this.set('password', hashedPwd  ) ;
    }
    done();
} )

userSchema.statics.buildUser = ( attr : userAttributes ) => new User(attr);

const User = mongoose.model<userDoc , UserModel>('User', userSchema);


export { User };