import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { createDefaultStore } from './utils/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
document.addEventListener('DOMContentLoaded', async () => {
  const defaultStore = await createDefaultStore();
  if (process.env.NODE_ENV === 'development') {
    //sets store to the window for local/development testing
    (window as any).store = defaultStore;
  }

  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={defaultStore}>
            <App />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});
