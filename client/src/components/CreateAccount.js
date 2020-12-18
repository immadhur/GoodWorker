import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import ExperienceForm from './ExperienceForm';
import { connect } from 'react-redux';
import { authenticateUser } from '../store/actions/userAction';
import { useHistory } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';

const CreateAccount = ({ authenticateUser, loading, isAuthenticated, error }) => {

  const [experienceCount, setExperienceCount] = useState(0);
  const [isAddEnabled, setAddEnabled] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceData, setExperienceData] = useState([]);
  const [isGWVerified, setGWVerified] = useState(false);
  const [isInputValid, setIsInputValid] = useState('');

  const history = useHistory();

  useEffect(() => {
    const isValid = isEmail(email) && password && name && isAddEnabled;
    setIsInputValid(isValid);
  }, [email, password, name, isAddEnabled]);

  useEffect(() => {
    if (isAuthenticated)
      history.push('/');
  }, [isAuthenticated]);

  useEffect(() => {
    if (error)
      alert(error);
  }, [error]);

  const addExperienceHandler = () => {
    setExperienceCount(c => c + 1);
    setAddEnabled(false);
  };

  const updateExperience = (data) => {
    const exp = experienceData;
    exp.push(data);
    setExperienceData(exp);
    if (!data.file)
      setGWVerified(false);
  };

  const setAddButtonEnabled = (isEnabled) => {
    setAddEnabled(isEnabled);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const submitButtonHandler = async (e) => {
    e.preventDefault();
    authenticateUser({ name, email, password, experienceData, isGWVerified }, true);
  };

  function loadExperienceView () {
    const experienceList = [];
    for (let count = 1; count <= experienceCount; count++) {
      experienceList.push(<ExperienceForm setExperienceData={updateExperience} setAddButtonEnabled={setAddButtonEnabled} key={count} id={count} />);
    }
    return experienceList;
  }
  return (
    <>
      {
        loading ?
          <Spinner />
          :
          <div>
            <br />
            <h2>Register with GoodWorker</h2>
            <div className='create-account-form-container'>
              <Form>
                <Form.Group required controlId="formBicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control onChange={changeHandler} required name='name' type="text" value={name} placeholder="Enter name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange={changeHandler} name='email' value={email} type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
    				</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={changeHandler} name='password' value={password} type="password" minLength={6} placeholder="Password" />
                </Form.Group>

                <div className='experience-block'>
                  <h2>Experience</h2>
                  <Button onClick={addExperienceHandler} disabled={!isAddEnabled}>Add</Button>
                </div>
                {
                  loadExperienceView()
                }
                <br />
                <Form.Text className="text-danger">
                  {error}
                </Form.Text>
                <Button disabled={!isInputValid} onClick={submitButtonHandler} variant="primary" className='col-md-12' type="submit">
                  Submit
  				</Button>
              </Form>
            </div>
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
  authenticateUser
})(CreateAccount);