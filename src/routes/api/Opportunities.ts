import express, { Request, Response } from 'express';
import Opportunity, { Status, TOpportunity } from '../../models/Opportunity';
import passport from 'passport';
import { updateOpportunity } from '../../lib/opportunities/opportunities';
import { ResponseStatus } from '../../types/global';
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const user: any = req?.user;
    const userId = user.id;
    if (!user)
      res.status(500).json({
        errorMessage: 'Unable to find User',
      });

    Opportunity.find({ userId }).then((opportunitiesList) => {
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunities: opportunitiesList,
      });
    });
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const opportunityInfo: Partial<TOpportunity> = req.body;
    const user: any = req.user;

    const opportunityPayload: Partial<TOpportunity> = { ...opportunityInfo };
    const today = new Date();

    opportunityPayload.lastChecked = today.toISOString();
    opportunityPayload.status = Status.SUBMITTED;
    opportunityPayload.userId = user.id;

    const opportunity = new Opportunity(opportunityPayload);

    opportunity.save().then((opportunity) => {
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunity: opportunity,
      });
    });
  },
);

router.post(
  '/:id/update-last-checked',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const user: any = req.user;
    const today = new Date();

    updateOpportunity(
      res,
      { lastChecked: today.toISOString() },
      req.params.id,
      user.id,
    );
  },
);

router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const opportunityPayload = req.body;
    const user: any = req.user;

    updateOpportunity(res, opportunityPayload, req.params.id, user.id);
  },
);

export { router as OpportunityRouter };
