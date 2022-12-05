import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Splash.css';
import * as sessionActions from "../../store/session";

const SplashPage = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/browse" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.signup({ email, password }))
    // .catch(async (res) => {
    // let data;
    // try {
    //     // .clone() essentially allows you to read the response body twice
    //     data = await res.clone().json();
    // } catch {
    //     data = await res.text(); // Will hit this case if the server is down
    // }
    // if (data?.errors) setErrors(data.errors);
    // else if (data) setErrors([data]);
    // else setErrors([res.statusText]);
    // });
    
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };



      

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SplashPage;