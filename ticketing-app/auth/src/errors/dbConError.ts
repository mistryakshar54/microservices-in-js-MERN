import { CustomError, customErrorType } from "./customError";

 export class DBConnectionError extends CustomError{
     reason = 'Error connecting to Database';
     constructor(){
        super('Error connecting to Database');
        Object.setPrototypeOf(this, DBConnectionError.prototype);
     }
     statusCode = 500;
     serializeError = () : customErrorType  => [ { message : this.reason } ]
 }