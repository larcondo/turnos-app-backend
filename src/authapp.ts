import express from 'express';
import cors, { CorsOptions } from 'cors';
import userRouter from './routes/usuarios';

const app = express();

const allowedOrigins = ['http://localhost:5173'];
const options: CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true,
  // optionsSuccessStatus: 200,
  // preflightContinue: true,
};

app.use(cors(options));
app.use(express.json());

app.use('/usuarios', userRouter);

export default app;