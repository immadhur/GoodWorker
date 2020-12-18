import './App.css';
import CreateAccount from './components/CreateAccount';
import JobsList from './components/JobsList';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { connect } from 'react-redux';
import { setAuthentication, logout } from './store/actions/userAction';
import React, { useEffect } from 'react';
import AppliedJobs from './components/AppliedJobs';

function App ({ isAuthenticated = false, setAuthentication, logout }) {

  useEffect(() => {
    setAuthentication(localStorage.getItem('token') !== null);
  }, [setAuthentication]);
  const routes =
    !isAuthenticated ?
      <Switch>
        <Route path='/signup' component={CreateAccount} />
        <Route path='/login' exact component={Login} />
        {/* <Route path='/logout' exact component={Logout} /> */}
        <Route path='/' component={JobsList} />
      </Switch>
      :
      <Switch>
        <Route path='/applied' component={AppliedJobs} />
        <Route path='/' component={JobsList} />
      </Switch>;
  return (
    <BrowserRouter>
    <div className="App">
        <Navbar {...{ isAuthenticated, setAuthentication, logout }} />
        {routes}
        {/* <JobsList /> */}
    </div>
    </BrowserRouter>
  );
}

export default connect(({ isAuthenticated }) => {
  return {
    isAuthenticated
  };
}, {
  setAuthentication,
  logout
})(App);
