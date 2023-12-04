import mongoose from 'mongoose';

export type UserLogin = {
  email: string;
  password: string;
};

export type User = UserLogin & {
  _id: string;
  firstName: string;
  lastName: string;
  github?: string;
  linkedIn?: string;
};

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
