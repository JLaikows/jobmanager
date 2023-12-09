import { FC } from 'react';
import { Box } from '@mui/material';
import { Taskbar } from '../../components/mobile/TaskBar';
import OpportunityForm from '../../components/opportunityForm';
import RequireAuth from '../../components/requireAuth';

export const CreateOpportunityPage: FC<{}> = () => {
  return (
    <RequireAuth>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Taskbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0px',
          }}
        >
          <OpportunityForm />
        </Box>
      </Box>
    </RequireAuth>
  );
};
