import express, { Express, Request, Response } from 'express';
import morganMiddleware from './src/middlewares/morgan';
import Logger from './src/lib/logger';
import { testRouter } from './src/routes/test';
import { ENV } from './src/types/env';
const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app: Express = express();
app.use(morganMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Successful reponse.');
});

if (env === ENV.DEV) {
  app.use('/test', testRouter);
}

app.listen(port, () => Logger.info(`Server ran successfully on port ${port}`));
