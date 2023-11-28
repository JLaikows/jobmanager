import express from 'express';
import { UserRouter } from './api/Users';
const router = express.Router();

router.use('/user', UserRouter);

export { router as ApiRouter };
