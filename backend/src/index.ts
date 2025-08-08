import express, { Request, Response } from 'express';
import client from './routes/client';
import cors from 'cors';

interface ErrorType extends Error {
  statusCode?: number;
}

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/client', client);

app.use((err: ErrorType, _req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});