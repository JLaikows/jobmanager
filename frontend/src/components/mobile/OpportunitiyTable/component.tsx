import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { MobileOpportunityTableRow } from './OpportunityTableRow';

interface IMobileOpportunityTable {
  opportunities: any[];
  getAllOpportunities: () => void;
}

export const MobileOpportunityTable: FC<IMobileOpportunityTable> = ({
  opportunities,
  getAllOpportunities,
}) => {
  useEffect(() => {
    getAllOpportunities();
  }, []);
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
        border: '2px solid #7A8D7D',
        borderRadius: '10px',
        transitionDuration: '1s',
      }}
    >
      {opportunities.map((opportunity) => {
        return <MobileOpportunityTableRow opportunity={opportunity} />;
      })}
    </Box>
  );
};
