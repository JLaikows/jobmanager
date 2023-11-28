export const validText = (str: any) => {
  return typeof str === 'string' && str.trim().length > 0;
};
