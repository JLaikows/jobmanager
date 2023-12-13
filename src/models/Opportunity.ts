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

//todo: update address to use google api
//todo: implement into opportunities
export type Address = {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
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
  lastChecked: String;
  contact?: TContact;
  secondaryContact?: TContact;
  userId: string;
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

const opportunitySchema = new mongoose.Schema(
  {
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
      type: {
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
      required: false,
    },
    status: String,
    lastChecked: String,
    contact: {
      type: contact,
      required: false,
    },
    secondaryContact: {
      type: contact,
      required: false,
    },
    userId: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Opportunity', opportunitySchema);
