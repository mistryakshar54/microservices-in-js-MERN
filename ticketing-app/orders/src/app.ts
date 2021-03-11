import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {orderRoutes} from './routes/index';
import { errorHandler, currentUser } from '@amdevcorp/ticketing-common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true); //Make sure express is behind ingress-nginx and thus allows the flow
app.use(json());
app.use( cookieSession({ signed: false, httpOnly: true,secure : process.env.NODE_ENV !== 'test' }) );
app.use('/api', currentUser ,orderRoutes);

app.use(errorHandler);

export { app };