// Environment variables
const PORT = 3010;
// ---------------------------
import express from 'express';
const app = express();
import userRouter from './routes/usuarios';
import turnRouter from './routes/turnos';

app.use(express.json());

app.use('/turnos', turnRouter);
app.use('/usuarios', userRouter);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server turnos running on port ${PORT}`);
});