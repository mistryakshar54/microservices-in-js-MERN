import { Router, Request , Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { DBConnectionError } from '../errors/dbConError';

const router = Router();
router.post('/signup' , [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min : 4 , max: 20 }).withMessage("Password must be min 4 and max 20 chars")
],(req : Request , res : Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array());
    }
    const {email , password} = req.body;
    console.log('User created!!');
    throw new DBConnectionError();
    //res.status(200).json({message : errors.array()});

});
router.post('/signin' , (req, res) => {});
router.post('/signout' , (req, res) => {});

export {router as authRoutes};