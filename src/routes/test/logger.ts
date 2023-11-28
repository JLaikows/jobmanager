import express, { Request, Response } from 'express';
import Logger from '../../lib/logger';
const router = express.Router();

router.get('/info', (req: Request, res: Response) => {
  Logger.info('Example Info Response');
  res.status(200).json({ message: 'Info Response Called' });
});
router.get('/error', (req: Request, res: Response) => {
  Logger.error('Example Error Response');
  res.status(500).json({ message: 'Error Response Called' });
});
router.get('/warn', (req: Request, res: Response) => {
  Logger.warn('Example Warn Response');
  res.status(200).json({ message: 'Warn Response Called' });
});
router.get('/http', (req: Request, res: Response) => {
  Logger.info('Example HTTP Response');
  res.status(200).json({ message: 'HTTP Response Called' });
});
router.get('/debug', (req: Request, res: Response) => {
  Logger.debug('Example Debug Response');
  res.status(200).json({ message: 'Debug Response Called' });
});

export { router as loggerRouter };
