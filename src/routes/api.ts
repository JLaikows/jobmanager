import express from 'express';
import { UserRouter } from './api/Users';
import { OpportunityRouter } from './api/Opportunities';
const router = express.Router();

router.use('/user', UserRouter);
router.use('/opportunity', OpportunityRouter);

export { router as ApiRouter };
