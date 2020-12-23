import { Router, Request , Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/badRequestError';
import { RequestValidationError } from '../errors/requestValidationError';
import { User } from '../models/users';

const router = Router();
router.post('/signup' , [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min : 4 , max: 20 }).withMessage("Password must be min 4 and max 20 chars")
],async (req : Request , res : Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array());
    }
    const {email , password} = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new BadRequestError('Email already in use');
    }
    const user = User.buildUser({ email, password })
    await user.save();
    res.status(201).send({ message : 'success', data : user });
});
router.post('/signin' , (req, res) => {});
router.post('/signout' , (req, res) => {});

export {router as authRoutes};