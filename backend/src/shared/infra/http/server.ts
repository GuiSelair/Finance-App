import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';

import AppError from '../../errors/AppError';
import routes from './routes';
import '../typeorm';
import '../../Container';

const app = express();
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
      type: 'error',
    });
  }
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('>> Server UP on port 3333'));
