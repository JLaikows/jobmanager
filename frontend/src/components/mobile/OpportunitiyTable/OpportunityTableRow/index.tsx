import { Box, Button, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface IMobileOpportunityTableRow {
  opportunity: any;
}

export const MobileOpportunityTableRow: FC<IMobileOpportunityTableRow> = ({
  opportunity,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status, company, title, ...fullInfo } = opportunity;
  const extraInfo = {
    'Full Time': opportunity.hours.fullTime,
    Title: opportunity.title,
  };
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // padding: '10% 5%',
        // margin: '10% 0%',
        border: '2px solid #7A8D7D',
        transitionDuration: '1s',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5% 5%',
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Box>
          <Typography>{company}</Typography>
          <Typography fontSize="small">{title}</Typography>
        </Box>
        <Typography>{status}</Typography>
      </Box>
      {isMenuOpen && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button sx={{ width: '75%' }} variant="contained">
            Last Checked: {opportunity.lastChecked}
          </Button>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '45% 45%',
              width: '90%',
            }}
          >
            {Object.entries(extraInfo).map((keyValue) => (
              <div>
                {keyValue[0]}: {`${keyValue[1]}`}
              </div>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
