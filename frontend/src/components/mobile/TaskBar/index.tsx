import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, useState } from 'react';
import LogoutButton from '../../logoutButton';
import OpportunityForm from '../../opportunityForm';
import * as styles from './styles';

export const Taskbar: FC = () => {
  const [isCreateOpportunityOpen, setIsCreateOpportunityOpen] = useState(false);
  const onClick = () => {
    setIsCreateOpportunityOpen(true);
  };
  const onClose = () => {
    setIsCreateOpportunityOpen(false);
  };

  return (
    <Box sx={styles.taskbarContainer}>
      <Button
        value="redirect"
        variant="text"
        color="secondary"
        onClick={onClick}
      >
        {!isCreateOpportunityOpen && (
          <Typography fontWeight="bold" color="white" variant="h4">
            +
          </Typography>
        )}
      </Button>
      <LogoutButton />
      <Modal
        open={isCreateOpportunityOpen}
        onClose={onClose}
        sx={{ overflow: 'scroll' }}
      >
        <Box sx={styles.modalContainer}>
          <OpportunityForm onClose={onClose} />
        </Box>
      </Modal>
    </Box>
  );
};
