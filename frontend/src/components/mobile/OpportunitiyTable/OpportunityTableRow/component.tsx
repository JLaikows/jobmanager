import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const STATUS_OPTIONS = [
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'On Going', value: 'ONGOING' },
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Interviewing', value: 'INTERVIEWING' },
];

interface IMobileOpportunityTableRow {
  opportunity: any;
  updateLastChecked: (opportunityId: string) => void;
  updateOpportunity: (opportunityId: string, opportunity: any) => void;
}

export const MobileOpportunityTableRow: FC<IMobileOpportunityTableRow> = ({
  opportunity,
  updateLastChecked,
  updateOpportunity,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status, company, title, ...fullInfo } = opportunity;
  const extraInfo = {
    'Full Time': opportunity?.hours?.fullTime,
    Title: opportunity.title,
  };

  const onStatusChange = (e: any) => {
    updateOpportunity(opportunity._id, { status: e.target.value });
  };
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '2px solid #7A8D7D',
        transitionDuration: '1s',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '3% 5%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            flexDirection: 'column',
            textAlign: 'left',
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Typography fontWeight="bold">{company}</Typography>
          <Typography fontSize="small" color="secondary">
            {title}
          </Typography>
        </Box>
        <Select value={status} size="small" onChange={(e) => onStatusChange(e)}>
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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
          <Button
            sx={{ width: '75%' }}
            variant="contained"
            onClick={() => updateLastChecked(opportunity._id)}
          >
            Last Checked: {opportunity.lastChecked}
          </Button>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '45% 45%',
              width: '90%',
              padding: '2%',
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
