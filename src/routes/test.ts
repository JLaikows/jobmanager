import express from 'express';
import { loggerRouter } from './test/logger';
const router = express.Router();

router.use('/logger', loggerRouter);

export { router as testRouter };
