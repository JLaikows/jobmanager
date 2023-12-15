export const rowContainer = (isRejected: boolean) => ({
  display: 'flex',
  backgroundColor: isRejected ? 'lightgrey' : '',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '2px solid #7A8D7D',
  transitionDuration: '1s',
});

export const headerContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '3% 5%',
};

export const titleContainer = {
  display: 'flex',
  justifyContent: 'left',
  flexDirection: 'column',
  textAlign: 'left',
  '&:hover': {
    cursor: 'pointer',
  },
};

export const appliedText = { fontSize: '10px' };

export const menuContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const lastCheckedButton = { width: '75%' };

export const menuGrid = {
  display: 'grid',
  gridTemplateColumns: '45% 45%',
  width: '90%',
  padding: '2%',
};

export const webPortalContainer = {
  display: 'grid',
  gridTemplateColumns: '50 50%',
  width: '90%',
  padding: '2%',
};

export const linkContainer = {};
