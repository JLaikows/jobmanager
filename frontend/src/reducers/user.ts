export enum UserActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_PREFERENCES = 'UPDATE_PREFERENCES',
}

const initialState: any | undefined = {
  isAuthenticated: false,
  user: {},
};

const userReducer = (state = initialState, action: any) => {
  console.log(state);
  switch (action.type) {
    case UserActions.UPDATE_PREFERENCES:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case UserActions.LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
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
