import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import {
  formatAdress,
  format as formatToDollar,
} from '../../../../utils/format';
import { Status, TOpportunity } from '../../../../types/opportunity';
import * as styles from './styles';

const STATUS_OPTIONS = [
  { label: 'Rejected', value: Status.REJECTED },
  { label: 'On Going', value: Status.ONGOING },
  { label: 'Submitted', value: Status.SUBMITTED },
  { label: 'Interviewing', value: Status.INTERVIEWING },
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
  const buttonColor =
    formattedLastChecked === new Date(Date.now()).toDateString()
      ? 'primary'
      : 'warning';
  const hasWebPortal = !!webPortal;
  const FormattedCreatedAt = new Date(createdAt).toDateString();
  const formattedAddress = formatAdress(address);
  const extraInfo = {
    'Full Time': fullTime,
    Title: title,
    Pay: minimumSalary >= 0 ? formatToDollar(minimumSalary) : 'Not Listed',
  };

  const openCloseMenu = () => setIsMenuOpen(!isMenuOpen);
  const callUpdateLastChecked = async () => {
    await updateLastChecked(_id);
    setIsMenuOpen(false);
  };
  const onStatusChange = (e: SelectChangeEvent<Status>) => {
    updateOpportunity(_id, { status: e.target.value as Status });
  };
  const isRejected = status === Status.REJECTED;
  return (
    <Box
      key={company + title + lastChecked}
      sx={styles.rowContainer(isRejected)}
    >
      <Box sx={styles.headerContainer}>
        <Box sx={styles.titleContainer} onClick={openCloseMenu}>
          <Typography fontWeight="bold" color={isRejected ? '#ff5252' : ''}>
            {company}
          </Typography>
          <Typography fontSize="small" color="secondary">
            {title}
          </Typography>
          <Typography variant="body1" sx={styles.appliedText} color="secondary">
            Applied:&nbsp;{FormattedCreatedAt}
          </Typography>
        </Box>
        <Select value={status} size="small" onChange={onStatusChange}>
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {isMenuOpen ? (
        <Box sx={styles.menuContainer}>
          <Button
            sx={styles.lastCheckedButton}
            variant="outlined"
            color={buttonColor}
            onClick={callUpdateLastChecked}
          >
            Last Checked: {formattedLastChecked}
          </Button>
          <Box sx={styles.menuGrid}>
            {Object.entries(extraInfo).map((keyValue) => (
              <Box>
                {keyValue[0]}: {`${keyValue[1]}`}
              </Box>
            ))}
          </Box>
          {hasWebPortal ? (
            <Box sx={styles.webPortalContainer}>
              <a href={webPortal?.link} target="_blank">
                Click to open Web Portal
              </a>
              {webPortal?.email ? (
                <Typography>Email:&nbsp;{webPortal?.email}</Typography>
              ) : null}
              {webPortal?.username ? (
                <Typography>Username:&nbsp;{webPortal?.username}</Typography>
              ) : null}
              {webPortal?.password ? (
                <Typography>Password:&nbsp;{webPortal?.password}</Typography>
              ) : null}
            </Box>
          ) : null}
          {!isRemote && address ? (
            <>
              <Typography fontSize="small" color="secondary">
                {formattedAddress}
              </Typography>
              <Typography fontSize="small" color="secondary">
                <Checkbox disabled value={address?.hybrid} />
              </Typography>
            </>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};
