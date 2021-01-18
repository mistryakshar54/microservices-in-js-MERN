import { CustomError, customErrorType } from './customError';

export class BadRequestError extends CustomError{
    statusCode= 400;
    constructor(public message : string){
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
     }
     serializeError = () : customErrorType => {
        return [{message : this.message}]
     }
    
}