import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './Splash.css';
import * as sessionActions from "../../store/session";

const SplashPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/browse" />;

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.length >= 5 && isValidEmail(email)) {
            sessionActions.storeEmail(email);
            history.push('/signup');
        }
    };

    const handleEmailChange = (e) => {
        setErrors([""])
        if(email.length < 5) {
            setErrors(["Email is required!"])
        } else if(!isValidEmail(email)) {
            setErrors(["Please enter a valid email address"])
        }
        setEmail(e.target.value);
    }

    return (
        <div>
            <div className="splash-banner">
                <div className="banner-new-icon">NEW!</div>
                <div className="banner-plan-info">
                    <span>Plans now start at <span className="price-label">$6.99</span>.</span>
                </div>
                <div className="banner-learn-more">
                    <Link to="/signup" className="learn-more-link">Learn More</Link>
                </div>
            </div>
            <div className="splash-header-wrapper">
                <div className="splash-header">
                    <span className="splash-logo">Logo</span>
                    <div className="language-switcher"></div>
                    <Link to="/login" className="splash-login-button">Sign In</Link>
                </div>
            </div>
            <div>
                <div className="splash-card-background">
                    <div className="splash-background-image-wrapper">
                        <img className="splash-background-image" alt="background" src={require('../../assets/login-background-cover.jpeg')}></img>
                        <div className="splash-background-gradient"></div>
                    </div>
                </div>
                <div className="splash-form-wrapper">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <form className="email-form" onSubmit={handleSubmit}>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div class="splash-email-wrapper">
                            <input
                                type="email"
                                value={email}
                                placeholder="Email address"
                                onChange={handleEmailChange}
                                required
                            />
                            <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                            </ul>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;