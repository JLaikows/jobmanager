import { FC, useEffect } from 'react';
import RequireAuth from '../../components/requireAuth';
import MobileOpportunityTable from '../../components/mobile/OpportunitiyTable';
import { Box } from '@mui/material';
import { Taskbar } from '../../components/mobile/TaskBar';

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
      <Taskbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1%',
        }}
      >
        <MobileOpportunityTable />
      </Box>
    </RequireAuth>
  );
};
