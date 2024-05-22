import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authApp from 'authapp';
import cors from 'cors';
const app = express();

// configure later on PM2?
const API_PORT = process.env.API_PORT || 3010;
const AUTH_PORT = process.env.AUTH_PORT || 4010;

// import userRouter from './routes/usuarios';
import turnRouter from './routes/turnos';
import demoRouter from './routes/demo';
import { createTurnosTable, createUsuariosTable } from './services/tables';

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

createUsuariosTable()
.then(result => console.log(result.message))
.catch(err => console.log(err));

createTurnosTable()
.then(result => console.log(result.message))
.catch(err => console.log(err));

app.use('/turnos', turnRouter);
// app.use('/usuarios', userRouter);
app.use('/demo', demoRouter);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(API_PORT, () => {
  console.log(`Server turnos running on port ${API_PORT}`);
});

authApp.listen(AUTH_PORT, () => {
  console.log(`Auth Server running on port ${AUTH_PORT}`);
});