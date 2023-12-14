import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { format as formatToDollar } from '../../../../utils/format';

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
  const { status, company, title, createdAt } = opportunity;
  const lastCheckedObject = new Date(opportunity.lastChecked);
  const lastChecked = lastCheckedObject.toDateString();
  const extraInfo = {
    'Full Time': opportunity?.hours?.fullTime,
    Title: opportunity.title,
    Pay:
      opportunity.salary?.amount >= 0
        ? formatToDollar(opportunity.salary?.amount)
        : 'Not Listed',
  };
  const hasWebPortal = !!opportunity.webPortal;
  const FormattedCreatedAt = new Date(opportunity.createdAt).toDateString();

  const onStatusChange = (e: any) => {
    updateOpportunity(opportunity._id, { status: e.target.value });
  };
  const isRejected = opportunity.status === 'REJECTED';
  return (
    <Box
      key={opportunity.company + opportunity.title + opportunity.lastChecked}
      style={{
        display: 'flex',
        backgroundColor: isRejected ? 'lightgrey' : '',
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
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Typography fontWeight="bold" color={isRejected ? '#ff5252' : ''}>
            {company}
          </Typography>
          <Typography fontSize="small" color="secondary">
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '10px' }}
            color="secondary"
          >
            Applied:&nbsp;{FormattedCreatedAt}
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
            Last Checked: {lastChecked}
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

          {hasWebPortal && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '50 50%',
                width: '90%',
                padding: '2%',
              }}
            >
              <Box
                sx={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <a href={opportunity.webPortal.link} target="_blank">
                  Click to open Web Portal
                </a>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography>
                  {opportunity.webPortal.username ? 'Username' : 'Email'}:&nbsp;
                </Typography>
                <Typography>
                  {opportunity.webPortal.username
                    ? opportunity.webPortal.username
                    : opportunity.webPortal.email}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography>Password:&nbsp;</Typography>
                <Typography>{opportunity.webPortal.password}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
