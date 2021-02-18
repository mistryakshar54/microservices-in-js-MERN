import { Router, Request , Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validationHandler, requireAuth } from '@amdevcorp/ticketing-common';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();
router.post( '/tickets', requireAuth , async(req : Request , res : Response) => {
    console.log("Henlooo!!! Came here");
    res.status(200).send({message : 'success'});
});
// router.post('/signup' , [
//     body('email').isEmail().withMessage('Email must be valid'),
//     body('password').trim().isLength({ min : 4 , max: 20 }).withMessage("Password must be min 4 and max 20 chars")
// ], validationHandler, async(req : Request , res : Response) => {
//     const {email , password} = req.body;
//     const existingUser = await User.findOne({ email });
//     if(existingUser){
//         throw new BadRequestError('Email already in use');
//     }
//     const user = User.buildUser({ email, password }) 
//     await user.save();
//     //Generate JWT
//     const jwtToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!)
//     req.session = {
//         jwt : jwtToken
//     }
//     //Store the session
//     res.status(201).send({ message : 'success', data : user });
// });
// router.post('/signin',[ 
//     body('email').isEmail().withMessage('Email must be valid'),
//     body('password').trim().notEmpty().withMessage("Password must not be empty")
// ], validationHandler , async(req : Request , res : Response) => {
//     const {email , password} = req.body;
//     const existingUser = await User.findOne({ email });
//     if(!existingUser){
//         throw new BadRequestError('Invalid Credentails');
//     }
//     const isValidPwd = bcrypt.compare( password, existingUser.password );
//     if( !isValidPwd ){
//         throw new BadRequestError('Invalid Credentails');
//     }
//     //Generate JWT
//     const jwtToken = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!)
//     req.session = {
//         jwt : jwtToken
//     }
//     //Store the session
//     res.status(200).send({ message : 'success', data : existingUser });

// });
// router.post('/signout' , (req, res) => {
//     req.session = null;
//     res.status(200).send({ message : 'success', data : 'User signed out!' });
// });

export {router as ticketRoutes};