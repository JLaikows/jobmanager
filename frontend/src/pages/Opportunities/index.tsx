import MobileOpportunityTable from '../../components/mobile/OpportunitiyTable';
import { Box, Button, Modal } from '@mui/material';
import { Taskbar } from '../../components/mobile/TaskBar';
import RequireAuth from '../../components/requireAuth';
import { FC, useState } from 'react';
import OpportunityForm from '../../components/opportunityForm';

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
