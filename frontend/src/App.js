import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import ProfilePage from "./components/ProfilePage";
import BrowsePage from "./components/BrowsePage";
import VideoShowPage from "./components/VideoShowPage";
import SavedListPage from "./components/SavedListPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/browse/video/:videoId">
          <VideoShowPage />
        </Route>
        <Route exact path="/browse">
          <Redirect from="/browse" to="/browse/all"/>
        </Route>
        <Route path="/browse/:filter">
          <BrowsePage />
        </Route>
        <Route path="/mylist" >
          <SavedListPage />
        </Route>
        <Route path="/profiles/manage">
          <ProfilePage editable={true}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;