import { FC, useEffect } from 'react';
import RequireAuth from '../../components/requireAuth';

interface IOpportunitiesPage {
  opportunities: any[];
  getAllOpportunities: () => void;
}
export const OpportunitiesPage: FC<IOpportunitiesPage> = ({
  opportunities,
  getAllOpportunities,
}) => {
  useEffect(() => {
    getAllOpportunities();
  }, []);

  return (
    <RequireAuth>
      {opportunities.map((opportunity) => {
        return opportunity.company;
      })}
    </RequireAuth>
  );
};
