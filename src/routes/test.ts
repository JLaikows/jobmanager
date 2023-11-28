import express from 'express';
import { loggerRouter } from './test/logger';
import { userRouter } from './test/user';
const router = express.Router();

router.use('/logger', loggerRouter);
router.use('/user', userRouter);

export { router as testRouter };
