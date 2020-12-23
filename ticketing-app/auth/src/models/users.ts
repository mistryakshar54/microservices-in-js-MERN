import mongoose from 'mongoose';

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
});

userSchema.statics.buildUser = ( attr : userAttributes ) => new User(attr);

const User = mongoose.model<userDoc , UserModel>('User', userSchema);

export { User };