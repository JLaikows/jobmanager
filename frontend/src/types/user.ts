export type TLoginUser = {
  email: string;
  password: string;
};

export type TSignUpUser = TLoginUser & {
  firstName: string;
  lastName: string;
};

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  github?: string;
  linkedIn: string;
};
