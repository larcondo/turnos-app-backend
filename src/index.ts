// Environment variables
const PORT = process.env.PORT || 3010;
// ---------------------------
import express from 'express';
import cors from 'cors';
const app = express();
import userRouter from './routes/usuarios';
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
app.use('/usuarios', userRouter);
app.use('/demo', demoRouter);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server turnos running on port ${PORT}`);
});