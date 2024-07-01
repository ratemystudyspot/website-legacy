import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { RecoveryProvider } from './context/RecoveryProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store = {store}>
  //    <App />
  // </Provider >
  <BrowserRouter>
    <AuthProvider>
      <RecoveryProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ThemeProvider>
      </RecoveryProvider>
    </AuthProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
