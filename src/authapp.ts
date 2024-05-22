import express from 'express';
const app = express();

import userRouter from './routes/usuarios';

app.use(express.json());

app.use('/usuarios', userRouter);

export default app;