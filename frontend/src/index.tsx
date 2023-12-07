import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { setAuthToken } from './utils/auth';
import { jwtDecode } from 'jwt-decode';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

let defaultStore;
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUser = jwtDecode(localStorage.jwtToken);
  const preloadedState = {
    user: decodedUser,
  };
  defaultStore = store(preloadedState);
} else {
  defaultStore = store({});
}
(window as any).store = defaultStore;

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
