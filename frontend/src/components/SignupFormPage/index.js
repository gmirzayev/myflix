import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './SignupForm.css';
import * as sessionActions from "../../store/session";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const savedEmail = sessionStorage.getItem("currentEmail");
  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/browse" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password }))
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
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <Link to={'/login'} className="signup-signin-link">Sign In</Link>
      </div>
      <div className="signup-main-container">
        <div className="signup-main-center">
          <form className="signup-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <span className="step-indicator">
              STEP <b>1</b> OF <b>1</b>
            </span>
            <h1 className="step-title">Create a password to start your membership</h1>
            <div className="step-description-row-1">Just a few more steps and you're done!</div>
            <div className="step-description-row-2">We hate paperwork, too.</div>
            <input
              type="text"
              value={email}
              placeholder="Email"
              className="signup-input email-input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Add a password"
              className="signup-input password-input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;