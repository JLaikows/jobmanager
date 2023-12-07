export enum ErrorActions {
  ADD_ERRORS = 'ADD_ERROR',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

const initialState: any | undefined = {
  messages: [],
};

const errorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ErrorActions.ADD_ERRORS:
      return {
        ...state,
        messages: [...state.messages, action.errorMessage],
      };
    case ErrorActions.CLEAR_ERRORS:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};

export default errorReducer;
