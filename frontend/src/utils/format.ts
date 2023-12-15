import { TAddress } from '../types/opportunity';

export const timeSince = (date: Date) => {
  const seconds = Math.floor(
    (new Date().getSeconds() - date.getSeconds()) / 1000,
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
};

export const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatAdress = (addressObject?: TAddress) => {
  if (!addressObject) return null;
  return (
    addressObject.street +
    ' ' +
    addressObject.apt +
    ', ' +
    addressObject.city +
    ', ' +
    addressObject.region +
    ' ' +
    addressObject.postalCode
  );
};
