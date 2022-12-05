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

  if (sessionUser) return <Redirect to="/" />;

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
    <form className="login form" onSubmit={handleSubmit}>
        {errors.length ? addErrors() : <></> }
        <label htmlFor='email'>Username or Email</label>
        <input
          type="text"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <label htmlFor='password'>Password</label>
        <input
          type="password"
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;