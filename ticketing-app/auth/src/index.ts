import express from 'express';
import { json } from 'body-parser';
import {authRoutes} from './routes/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(json());

app.get('/api/users/currentUser' ,( req , res ) => res.status(200).json({message : "This is the current user"}));
app.use('/api/users/auth' ,authRoutes);

app.use(errorHandler);

app.listen( 3000 , ()=> console.log('App listening on 3000!!!!'));