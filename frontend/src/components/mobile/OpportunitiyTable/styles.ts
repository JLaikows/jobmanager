export const opportunityContainer = {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  marging: 0,
  width: '100%',
};

export const opportunitiesRowContainer = {
  display: 'flex',
  flexDirection: 'column',
  margin: '2%',
  width: '95%',
  border: '2px solid #7A8D7D',
  borderRadius: '10px',
  transitionDuration: '1s',
};

const evenRow = {
  backgroundColor: '#eeffe6',
};

export const getRowColor = (index: number) => (index % 2 !== 0 ? evenRow : {});
