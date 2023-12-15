import MobileOpportunityTable from '../../components/mobile/OpportunitiyTable';
import { Box } from '@mui/material';
import { Taskbar } from '../../components/mobile/TaskBar';
import RequireAuth from '../../components/requireAuth';
import { FC } from 'react';

const OpportunitiesPage: FC = () => {
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

export default OpportunitiesPage;
