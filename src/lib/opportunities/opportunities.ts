import { ObjectId } from 'mongodb';
import Opportunity, { Status, TOpportunity } from '../../models/Opportunity';
import { ResponseStatus } from '../../types/global';
import mongoose from 'mongoose';

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
  const session = await mongoose.startSession();
  session.startTransaction();

  Opportunity.findByIdAndUpdate(_id, opportunityPayload, { new: true })
    .then(async (opportunity) => {
      if (new ObjectId(opportunity?.userId ?? '') != userId) {
        await session.abortTransaction();
        res.status(500).json({
          status: ResponseStatus.FAILED,
          errorMessage: 'Unauthorized to edit opportunity',
        });
        return;
      }
      await session.commitTransaction();
      res.json({
        status: ResponseStatus.SUCCESS,
        opportunity: opportunity,
      });
    })
    .catch((e) => {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        errorMessage: e.message,
      });
    });
};
