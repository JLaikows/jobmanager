import express, { Request, Response } from 'express';
import { TOpportunity } from '../../models/Opportunity';
import passport from 'passport';
import {
  createOpportunity,
  updateLastChecked,
  updateOpportunity,
} from '../../lib/opportunities/opportunities';
import { ResponseStatus } from '../../types/global';
const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const opportunityInfo: Partial<TOpportunity> = req.body;
    const user: any = req.user;
    const callback = (opportunity: TOpportunity) => {
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunity: opportunity,
      });
    };

    try {
      await createOpportunity(opportunityInfo, user.id, callback);
      //response is returned in the above callback
    } catch (e) {
      let message = 'Unknown Error Occured Creating Opportunity';
      if (e instanceof Error) message = e.message;
      res.status(400).json({
        status: ResponseStatus.FAILED,
        errorMessage: message,
      });
    }
  },
);

router.post(
  '/:id/update-last-checked',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const opportunityId = req.params.id;
    const user: any = req.user;
    console.log(user, ' + ', opportunityId);
    const callback = (opportunity: TOpportunity) => {
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunity: opportunity,
      });
    };

    try {
      await updateLastChecked(opportunityId, user.id, callback);
      //response is returned in the above callback
    } catch (e) {
      let message = 'Unknown Error Updating Last Checked';
      if (e instanceof Error) message = e.message;
      res.status(400).json({
        status: ResponseStatus.FAILED,
        errorMessage: message,
      });
    }
  },
);

router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const opportunity = req.body;
    const user: any = req.user;
    const callback = (opportunity: TOpportunity) => {
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunity: opportunity,
      });
    };

    opportunity['_id'] = req.params.id;
    try {
      await updateOpportunity(opportunity, user.id, callback);
      //response is returned in the above callback
    } catch (e) {
      let message = 'Unknown Error Updating Last Checked';
      if (e instanceof Error) message = e.message;
      res.status(400).json({
        status: ResponseStatus.FAILED,
        errorMessage: message,
      });
    }
  },
);

export { router as OpportunityRouter };
