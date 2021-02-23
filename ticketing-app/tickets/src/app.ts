import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {ticketRoutes} from './routes/index';
import { errorHandler, currentUser } from '@amdevcorp/ticketing-common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true); //Make sure express is behind ingress-nginx and thus allows the flow
app.use(json());
app.use( cookieSession({ signed: false, httpOnly: true,secure : process.env.NODE_ENV !== 'test' }) );
// app.use(currentUser);


// app.get('/api/users/currentUser' ,( req , res ) => {
//     if( !req.session?.jwt ){
//         res.status(200).json({currentUser : null});
//     }
//     try{
//         const decodedToken = jwt.verify( req.session?.jwt , process.env.JWT_KEY!  )
//         res.status(200).json({currentUser : decodedToken});
//     }catch{
//         res.status(200).json({currentUser : null});
//     }  
// });
app.use('/api', currentUser ,ticketRoutes);

app.use(errorHandler);

export { app };