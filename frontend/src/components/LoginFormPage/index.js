import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/browse" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const addErrors = () => {
    return (
        <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>)
  }

  return (
    <>
      <div className="login-page">
        <div className="login-header"></div>
        <div className="login-background-wrapper">
          <img className="login-background-image" alt="background" src={require('../../assets/login-background-cover.jpeg')}></img>
          {/* <img className="login-background-image" src={require('../../assets/wp5924579-waifu-anime-wallpapers.png')}></img> */}
        </div>
        <div className="login-body">
          <div className="login-content">
            <h1>Sign In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                {errors.length ? addErrors() : <></> }
                <input
                  type="text"
                  id='email'
                  placeholder='Email'
                  className='login-text-field'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id='password'
                  placeholder='Password'
                  className='login-text-field'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              <button className="login-signin-button" type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;