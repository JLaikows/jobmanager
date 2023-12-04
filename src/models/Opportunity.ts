import mongoose from 'mongoose';

export enum Status {
  REJECTED = 'REJECTED',
  ONGOING = 'ONGOING',
  SUBMITTED = 'SUBMITTED',
  INTERVIEWING = 'INTERVIEWING',
}

export type Milestone = {
  title: string;
  completed: boolean;
};

export type TContact = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
};

export type TOpportunity = {
  company: string;
  title: string;
  salary: {
    hourly: boolean;
    amount: number;
  };
  hours: {
    fullTime: boolean;
    minimum: number;
    maximum?: number;
  };
  webPortal: {
    link: string;
    password: string;
    email?: string;
    username?: string;
  };
  status: Status;
  lastChecked: Date;
  contact?: TContact;
  secondaryContact?: TContact;
};

const contact = {
  name: String,
  title: String,
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
};

const opportunitySchema = new mongoose.Schema({
  company: String,
  title: String,
  salary: {
    hourly: Boolean,
    amount: Number,
  },
  hours: {
    fullTime: Boolean,
    minimum: Number,
    maximum: {
      type: Number,
      required: false,
    },
  },
  webPortal: {
    link: String,
    password: String,
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
  },
  status: String,
  lastChecked: Date,
  contact: {
    type: contact,
    required: false,
  },
  secondaryContact: {
    type: contact,
    required: false,
  },
});

export default mongoose.model('Opportunity', opportunitySchema);
