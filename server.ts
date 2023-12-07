import express, { Express, Request, Response } from 'express';
import morganMiddleware from './src/middlewares/morgan';
import Logger from './src/lib/logger';
import { testRouter } from './src/routes/test';
import { ENV } from './src/types/global';
import mongoose, { Connection } from 'mongoose';
import { ApiRouter } from './src/routes/api';
import { initializePassport } from './src/configs/passport';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
const port = process.env.PORT ?? '3000';
const env = process.env.NODE_ENV ?? 'development';
const mongoString = process.env.MONGODB_KEY ?? '';

const app: Express = express();

try {
  //connect to database
  mongoose.connect(mongoString);
  const database: Connection = mongoose.connection;
  database.on('error', (error) => {
    throw error;
  });
  database.once('connected', () => {
    Logger.info('MongoDB connection established');
  });

  //setup middlewares
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(morganMiddleware);
  app.use(passport.initialize());
  initializePassport(passport);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //setup routes
  if (env === ENV.DEV) {
    app.use('/test', testRouter);
  }
  app.use('/api', ApiRouter);

  app.listen(port, () =>
    Logger.info(`Server ran successfully on port ${port}`),
  );
} catch (e) {
  Logger.error(`Error Starting Server - ${e}`);
}
