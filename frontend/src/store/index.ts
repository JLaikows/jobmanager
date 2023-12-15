import { configureStore as toolkitCS } from '@reduxjs/toolkit';
import rootReducer from '../reducers/root';
import { TState } from '../types/state';

const configureStore = (preloadedState = {}) =>
  toolkitCS({
    reducer: rootReducer,
    preloadedState,
  });

export default configureStore;
