import express from 'express';
import logger from 'morgan';

import Environment from './config/environment';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const env = new Environment();
const app = express();

app.use(logger('dev', { skip: () => !env.app.inProd }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
