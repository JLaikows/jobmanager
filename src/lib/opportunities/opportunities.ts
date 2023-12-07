import { ObjectId } from 'mongodb';
import Opportunity, { Status, TOpportunity } from '../../models/Opportunity';
import { ResponseStatus } from '../../types/global';

/**
 * Used to update an opportunity
 *
 * @param res res object passed from express
 * @param opportunityPayload opportunity payload to update
 * @param _id id of opportunity to be updated
 * @param userId userId from passport middleware
 */
export const updateOpportunity = async (
  res: any,
  opportunityPayload: any,
  _id: string,
  userId: ObjectId,
): Promise<void> => {
  Opportunity.findById(_id).then((opportunity) => {
    if (!opportunity)
      res.status(500).json({
        status: ResponseStatus.FAILED,
        errorMessage: 'Failed to find opportunity',
      });
    if (new ObjectId(opportunity?.userId ?? '') != userId) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        errorMessage: 'Unauthorized to edit opportunity',
      });
    }
    const payload = { ...opportunity, ...opportunityPayload };
    payload.save().then((opportunity: any) => {
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunity: opportunity,
      });
    });
  });
};
