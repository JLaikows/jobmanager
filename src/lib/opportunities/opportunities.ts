import { ObjectId } from 'mongodb';
import Opportunity, { Status, TOpportunity } from '../../models/Opportunity';

/**
 * @description creates a new opportunity from a passed in opportunity object. Runs provided callback after opportunity is created.
 * @param opportunityInfo Partial-TOpportunity
 * @param userId string
 * @param callback function
 */
export const createOpportunity = async (
  opportunityInfo: Partial<TOpportunity>,
  userId: string,
  callback: (opportunity: any) => void,
): Promise<void> => {
  const opportunityPayload: Partial<TOpportunity> = { ...opportunityInfo };
  const today = new Date();

  opportunityPayload.lastChecked = today.toISOString();
  opportunityPayload.status = Status.SUBMITTED;
  opportunityPayload.userId = userId;

  const opportunity = new Opportunity(opportunityPayload);

  opportunity.save().then((opportunity) => {
    callback(opportunity);
  });
};

/**
 * @description updates an the last checked property of an existing opportunity, runs callback after time is created
 * @param opportunityInfo Partial-TOpportunity
 * @param userId string
 * @param callback function
 */
export const updateLastChecked = async (
  opportunityId: string,
  userId: ObjectId,
  callback: (opportunity: any) => void,
): Promise<void> => {
  const today = new Date();
  updateOpportunity(
    { _id: opportunityId, lastChecked: today.toISOString() },
    userId,
    callback,
  );
};

/**
 * @description - updates an existing opportunity, runs callback after update is saved
 * @param opportunityInfo Partial-TOpportunity
 * @param userId string
 * @param callback function
 */
export const updateOpportunity = async (
  opportunityInfo: Partial<TOpportunity>,
  userId: ObjectId,
  callback: (opportunity: any) => void,
): Promise<void> => {
  const { _id, ...opportunityPayload } = opportunityInfo;
  console.log(opportunityPayload);

  Opportunity.findById(_id).then((opportunity) => {
    if (!opportunity) throw new Error('No Opportunity Found');
    if (new ObjectId(opportunity.userId ?? '') != userId) {
      throw new Error('Unauthorized to edit Opportunity');
    }
    const payload = Object.assign(opportunity, opportunityPayload);
    payload.save().then((opportunity) => {
      callback(opportunity);
    });
  });
};
