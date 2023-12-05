import { ErrorActions } from '../reducers/errors';

export const addErrorAction = (errorMessage: string) => ({
  type: ErrorActions.ADD_ERRORS,
  errorMessage,
});

export const clearErrorsAction = () => ({
  type: ErrorActions.CLEAR_ERRORS,
});

export const addError = (errorMessage: string) => (dispatch: any) => {
  dispatch(addErrorAction(errorMessage));
};

export const clearErrors = () => (dispatch: any) => {
  dispatch(clearErrorsAction());
};
