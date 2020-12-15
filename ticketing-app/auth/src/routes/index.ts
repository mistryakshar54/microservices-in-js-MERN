import { Router } from 'express';

const router = Router();
router.get('/signup' , (req, res) => {res.status(200).json("Signup")});
router.post('/signin' , (req, res) => {});
router.post('/signout' , (req, res) => {});

export {router as authRoutes};