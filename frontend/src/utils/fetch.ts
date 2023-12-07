export const getApiServer: () => string = () => {
  const environment = process.env.NODE_ENV;
  switch (environment) {
    case 'development':
      return 'http://localhost:8081/api';
    default:
      throw new Error('No Environment Provided');
  }
};
