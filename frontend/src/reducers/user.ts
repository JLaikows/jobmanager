export enum UserActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_PREFERENCES = 'UPDATE_PREFERENCES',
}

const initialState: any | null = null;

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActions.UPDATE_PREFERENCES:
      return action.user;
    case UserActions.LOGOUT:
      return null;
    case UserActions.LOGIN:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
