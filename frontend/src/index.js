import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from "./context/Modal";
import configureStore from './store';
import { restoreSession, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session'; 
import * as profileActions from './store/profiles';
import * as videoActions from './store/videos';

const store = configureStore(); 

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.csrfFetch = csrfFetch;
  window.profileAction = profileActions;
  window.videoActions = videoActions;
}

const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <ModalProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ModalProvider>
    </React.StrictMode>
  );
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  restoreSession().then(initializeApp)
} else {
  initializeApp();
}