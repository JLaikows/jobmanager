import express from 'express';
import { UserRouter } from './api/Users';
import { OpportunityRouter } from './api/Opportunities';
const router = express.Router();

router.use('/users', UserRouter);
router.use('/opportunities', OpportunityRouter);

export { router as ApiRouter };
