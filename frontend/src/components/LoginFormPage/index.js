import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    if(checkEmail) {
      if(email.length < 5) {
        setErrors(["Please enter a valid email."])
      } else {
        setErrors([""]);
      }
    }
  }, [email, checkEmail])

  if (sessionUser) {
    return <Redirect to="/browse" />;
  }
  
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

  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({email: "demo@user.io", password: "password"}))
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
        </ul>
    )
  }

  return (
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
              <input
                type="text"
                id='email'
                placeholder='Email'
                className='login-text-field'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {setCheckEmail(true)}}
                required
              />
              <div className="login-email-error">
                {errors.length ? addErrors() : <></> }
              </div>
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
            <button className="login-signin-button" onClick={handleDemoLogin}>Demo User</button>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default LoginFormPage;