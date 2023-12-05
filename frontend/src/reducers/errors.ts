export enum ErrorActions {
  ADD_ERRORS = 'ADD_ERROR',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

const initialState: any | undefined = [];

const errorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ErrorActions.ADD_ERRORS:
      return state.push(action.message);
    case ErrorActions.CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errorReducer;
