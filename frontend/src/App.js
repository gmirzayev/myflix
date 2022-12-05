import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/login">
          {/* <Navigation /> */}
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <Navigation />
          <SignupFormPage />
        </Route>
        <Route path="/browse">
          <Navigation />
        </Route>
      </Switch>
    </>
  );
}

export default App;