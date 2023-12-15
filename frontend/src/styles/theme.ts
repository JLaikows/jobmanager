import { createTheme } from '@mui/material';

export const colors = {
  primary: '#7A8D7D',
  secondary: '#5B5251',
  error: '#CCAE91',
  warning: '#ff5252',
  contrastPrimaryText: '#F4F4F4',
  contractPrimaryTable: '#eeffe6',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.contrastPrimaryText,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
  },
});
