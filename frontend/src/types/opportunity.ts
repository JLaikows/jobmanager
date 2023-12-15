export enum Status {
  REJECTED = 'REJECTED',
  ONGOING = 'ONGOING',
  SUBMITTED = 'SUBMITTED',
  INTERVIEWING = 'INTERVIEWING',
}

export type TAddress = {
  street: string;
  apt: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  hybrid: boolean;
};

export type TContact = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
};

export type TOpportunity = {
  _id: string;
  company: string;
  title: string;
  jobListingURL?: string;
  isRemote?: boolean;
  salary: {
    hourly: boolean;
    amount: number;
  };
  hours: {
    fullTime: boolean;
    minimum: number;
    maximum?: number;
  };
  webPortal?: {
    link: string;
    password: string;
    email?: string;
    username?: string;
  };
  status: Status;
  lastChecked: string;
  contact?: TContact;
  secondaryContact?: TContact;
  address?: TAddress;
  userId: string;
  createdAt: string;
};
