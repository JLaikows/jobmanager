import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import {
  formatAdress,
  format as formatToDollar,
} from '../../../../utils/format';
import { TOpportunity } from '../../../../types/opportunity';

const STATUS_OPTIONS = [
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'On Going', value: 'ONGOING' },
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Interviewing', value: 'INTERVIEWING' },
];

interface IMobileOpportunityTableRow {
  opportunity: TOpportunity;
  updateLastChecked: (opportunityId: string) => void;
  updateOpportunity: (
    opportunityId: string,
    opportunity: Partial<TOpportunity>,
  ) => void;
}

export const MobileOpportunityTableRow: FC<IMobileOpportunityTableRow> = ({
  opportunity,
  updateLastChecked,
  updateOpportunity,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(opportunity);
  const {
    _id,
    status,
    company,
    title,
    createdAt,
    lastChecked,
    webPortal,
    address,
    isRemote,
    salary: { amount: minimumSalary },
    hours: { fullTime },
  } = opportunity;
  const lastCheckedObject = new Date(lastChecked);
  const formattedLastChecked = lastCheckedObject.toDateString();
  const extraInfo = {
    'Full Time': fullTime,
    Title: title,
    Pay: minimumSalary >= 0 ? formatToDollar(minimumSalary) : 'Not Listed',
  };
  const hasWebPortal = !!webPortal;
  const FormattedCreatedAt = new Date(createdAt).toDateString();

  const formattedAddress = formatAdress(address);
  const onStatusChange = (e: any) => {
    updateOpportunity(_id, { status: e.target.value });
  };
  const isRejected = status === 'REJECTED';
  return (
    <Box
      key={company + title + lastChecked}
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
            onClick={() => updateLastChecked(_id)}
          >
            Last Checked: {formattedLastChecked}
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
                <a href={webPortal?.link} target="_blank">
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
                  {webPortal?.username ? 'Username' : 'Email'}
                  :&nbsp;
                </Typography>
                <Typography>
                  {webPortal?.username ? webPortal?.username : webPortal?.email}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography>Password:&nbsp;</Typography>
                <Typography>{webPortal?.password}</Typography>
              </Box>
            </Box>
          )}
          {!isRemote && (
            <>
              <Typography fontSize="small" color="secondary">
                {formattedAddress}
              </Typography>
              <Typography fontSize="small" color="secondary">
                <Checkbox disabled value={address?.hybrid} />
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
