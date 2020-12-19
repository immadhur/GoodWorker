import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { authenticateUser, setError } from '../store/actions/userAction';
import isEmail from 'validator/es/lib/isEmail';
import Spinner from './UI/Spinner/Spinner';

const Login = ({ authenticateUser, isAuthenticated, loading, error, setError }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputValid, setIsInputValid] = useState('');
  const history = useHistory();

  useEffect(() => {
    const isValid = isEmail(email) && password !== '';
    setIsInputValid(isValid);
  }, [email, password]);

  useEffect(() => {
    if (isAuthenticated)
      history.push('/');
  }, [isAuthenticated]);

  useEffect(() => {
    setError('');
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'email')
      setEmail(value);
    else
      setPassword(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    authenticateUser({ email, password }, false);
  };

  return (
    <>
      {
        loading ?
          <Spinner />
          :
          <div className='create-account-form-container'>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={changeHandler} name='email' value={email} type="email" placeholder="Enter email" />

              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={changeHandler} name='password' value={password} type="password" minLength={6} placeholder="Password" />
              </Form.Group>
              <Form.Text className="text-danger">
                {error}
              </Form.Text>
              <u className='register-from-login' onClick={() => history.push('/signup')}>Register yourself on GoodWorker</u>
              <Button disabled={!isInputValid} className='col-md-12' type='submit'>Login</Button>
            </Form>
          </div>
      }
    </>
  );
};

const mapStateToProps = ({ loading, isAuthenticated, error }) => {
  return {
    loading,
    isAuthenticated,
    error
  };
};
export default connect(mapStateToProps, {
  authenticateUser,
  setError
})(Login);