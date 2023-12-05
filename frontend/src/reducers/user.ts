export enum UserActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_PREFERENCES = 'UPDATE_PREFERENCES',
}

const initialState: any | undefined = {
  user: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActions.UPDATE_PREFERENCES:
      return {
        ...state,
        user: action.currentUser,
      };
    case UserActions.LOGOUT:
      return {
        user: null,
      };
    case UserActions.LOGIN:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
