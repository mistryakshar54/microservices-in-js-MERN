import { RequestValidationError } from './../errors/requestValidationError';
import { NextFunction, Request,Response } from "express";
import { body, validationResult } from 'express-validator';

export const validationHandler = ( req: Request,res: Response,next: NextFunction ) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array());
    }
    next();
}