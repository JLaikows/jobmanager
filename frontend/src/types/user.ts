export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  github?: string;
  linkedIn: string;
};

export enum UserActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_PREFERENCES = 'UPDATE_PREFERENCES',
}
