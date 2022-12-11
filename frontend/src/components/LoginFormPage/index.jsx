import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../Footer';
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [checkEmail, setCheckEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if(checkEmail) {
      if(email.length < 5) {
        setEmailError(["Please enter a valid email."])
      } else {
        setEmailError([""]);
      }
    }
    if(checkPassword) {
      if(password.length < 5) {
        setPasswordError(["Your password must contain between 4 and 60 characters."])
      } else {
        setPasswordError([""]);
      }
    }
  }, [email, checkEmail, password, checkPassword]);

  if (sessionUser) {
    return <Redirect to="/browse" />;
  }
  
  const checkErrors = (errors) => {
    if(errors[0] === 'email') {
      setErrors([`Sorry, we can't find an account with this email address. Please try again or create a new account.`])
    } else if (errors[0] === 'password') {
      setErrors([`Incorrect password. Please try again.`])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) checkErrors(data.errors);
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

  const addErrors = (errors, submit=false) => {
    if(submit === true) {
      return (
        <div className="login-submit-error">
          <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )
    } else {
      return (
        <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
    )
    }
  }

  return (
    <div className="login-page">
      <div className="login-background-wrapper">
        <img className="login-background-image" alt="background" src={require('../../assets/login-background-cover.jpeg')}></img>
      </div>
      <div className="login-header">
        <Link to="/" className="logo-link-wrapper">
          <span className="logo-root">Logo</span>
        </Link>
      </div>
      <div className="login-body">
        <div className="login-content">
          <h1>Sign In</h1>
          {errors.length ? addErrors(errors, true) : <></> }
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field-container">
              <div className="field-wrapper">
                <input
                  type="text"
                  id='emailLoginField'
                  className='login-text-field'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {setCheckEmail(true)}}
                />
                <label htmlFor="emailLoginField" className={email.length > 0 ? "placeholder-label hasText" : "placeholder-label"}>Email</label>
                </div>
              <div className="login-field-error">
                {emailError.length ? addErrors(emailError) : <></> }
              </div>
            </div>
            <div className="login-field-container">
              <div className="field-wrapper">
                <input
                  type="password"
                  id='passwordLoginField'
                  className='login-text-field'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {setCheckPassword(true)}}
                />
                <label htmlFor="passwordLoginField" className={password.length > 0 ? "placeholder-label hasText" : "placeholder-label"}>Password</label>
              </div>
              <div className="login-field-error">
                {passwordError.length ? addErrors(passwordError) : <></> }
              </div>
            </div>
            <button className="login-signin-button" type="submit">Sign In</button>
            <button className="login-signin-button" id="demo" onClick={handleDemoLogin}>Demo User</button>
          </form>
          <div className="login-extra">
            <div className="login-signup">
              <div className="login-signup-holder">New to Myflix?<Link to="/signup" className="login-signup-button">Sign up now</Link>.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default LoginFormPage;