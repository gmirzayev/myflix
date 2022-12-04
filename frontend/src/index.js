import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import { restoreSession, csrfFetch } from './store/csrf';
import { createUser, loginUser, logoutUser } from './store/usersReducer'; 

// let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     let initialState = {};

//     if (currentUser) {
//         initialState = {
//             users: {
//             [currentUser.id]: currentUser
//             }
//         };
//     };

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  window.csrfFetch = csrfFetch;
}

const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreSession().then(initializeApp)
} else {
  initializeApp();
}