 import { ValidationError } from 'express-validator';
import { CustomError, customErrorType } from './customError';
 
 export class RequestValidationError extends CustomError{
     statusCode = 400;
     errors: ValidationError[];
     constructor( errors : ValidationError[] ){
        super('Request validation');
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
     }
     serializeError = () : customErrorType => {
        return this.errors.map( e =>  { return {message : e.msg , field : e.param} } )
     }
 }