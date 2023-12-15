import { Box, Checkbox, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import MobileOpportunityTableRow from './OpportunityTableRow';

interface IMobileOpportunityTable {
  opportunities: any[];
  getAllOpportunities: () => void;
}

export const MobileOpportunityTable: FC<IMobileOpportunityTable> = ({
  opportunities,
  getAllOpportunities,
}) => {
  const [showRejected, setShowRejected] = useState(false);
  useEffect(() => {
    getAllOpportunities();
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        marging: 0,
        width: '100%',
      }}
    >
      <Typography>
        <Checkbox
          value={showRejected}
          onChange={() => setShowRejected(!showRejected)}
        />
        Show Rejected
      </Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '2%',
          width: '95%',
          border: '2px solid #7A8D7D',
          borderRadius: '10px',
          transitionDuration: '1s',
        }}
      >
        {opportunities.map((opportunity) => {
          if (!showRejected && opportunity.status === 'REJECTED') return;
          return (
            <MobileOpportunityTableRow
              key={opportunity.company + '-' + opportunity.title}
              opportunity={opportunity}
            />
          );
        })}
      </Box>
    </Box>
  );
};
