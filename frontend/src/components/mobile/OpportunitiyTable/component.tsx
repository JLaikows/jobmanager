import { Box, Checkbox, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import MobileOpportunityTableRow from './OpportunityTableRow';
import * as styles from './styles';
import { TOpportunity } from '../../../types/opportunity';

interface IMobileOpportunityTable {
  opportunities: TOpportunity[];
  getAllOpportunities: () => void;
}

export const MobileOpportunityTable: FC<IMobileOpportunityTable> = ({
  opportunities,
  getAllOpportunities,
}) => {
  const [showRejected, setShowRejected] = useState(false);
  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  const updateShowRejected = () => setShowRejected(!showRejected);
  return (
    <Box sx={styles.opportunityContainer}>
      <Typography>
        <Checkbox value={showRejected} onChange={updateShowRejected} />
        Show Rejected
      </Typography>
      <Box sx={styles.opportunitiesRowContainer} className="table">
        {opportunities.map((opportunity, i) => {
          if (!showRejected && opportunity.status === 'REJECTED') return null;
          return (
            <Box sx={styles.getRowColor(i)}>
              <MobileOpportunityTableRow
                key={opportunity.company + '-' + opportunity.title}
                opportunity={opportunity}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
