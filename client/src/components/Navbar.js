import React from 'react';
import { useHistory } from "react-router-dom";
import { logout } from '../store/actions/userAction';

const Navbar = ({ isAuthenticated, logout }) => {
  const history = useHistory();

  const logoutHandler = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isGWVerified');
    history.push('/');
    await logout();
  };
  return (
    <div className='navbar'>
      <h1 onClick={() => history.push('/')} > GoodWorker</h1>
      <div>
        {isAuthenticated && <p onClick={() => history.push('/applied')}>Applied Jobs</p>}
        <p onClick={isAuthenticated ? logoutHandler : () => history.push('/login')}>{isAuthenticated ? 'Logout' : 'Login'}</p>
      </div>
    </div>
  );
};

export default Navbar;