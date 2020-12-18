import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceForm = ({ setAddButtonEnabled, setExperienceData }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isPresentChecked, setPresentChecked] = useState(false);
  const [organization, setOrganization] = useState('');
  const [areDetailsSaved, setDetailsSaved] = useState(false);
  const [isAddEnabled, setAddEnabled] = useState(false);
  const [file, setFile] = useState();

  const presentCheckHandler = (e) => {
    const isChecked = e.target.checked;
    if (isChecked)
      setEndDate(new Date());
    setPresentChecked(isChecked);
  };

  useEffect(() => {
    const isFormValid = startDate && endDate && organization && true;
    setAddEnabled(isFormValid);
  }, [startDate, endDate, organization]);

  const changeHandler = (e) => {
    const { name } = e.target;
    switch (name) {
      case 'organization':
        setOrganization(e.target.value);
        break;
      case 'startDate':
        setStartDate(e);
        break;
      case 'endDate':
        setEndDate(e);
        break;
      default:
        return;
    }
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const addButtonHandler = (e) => {
    e.preventDefault();
    setDetailsSaved(true);
    console.log({ file });
    setExperienceData({ organization, startDate, endDate, file: file?.name });
    setAddButtonEnabled(true);
  };

  return (
    <div>
      <div className='disable-layer' style={{ display: areDetailsSaved ? 'block' : 'none' }} />
      <Form.Group>
        <Form.Label>Organization name</Form.Label>
        <Form.Control name='organization' value={organization} onChange={changeHandler} type="text" placeholder="Organization" />
      </Form.Group>
      <Form.Group>
        <Form.Group className='col-md-6' controlId="formBasicEml">
          <Form.Label className='col-md-2'>From:</Form.Label>
          <DatePicker name='startDate' selected={startDate} maxDate={new Date()} onChange={date => setStartDate(date)} />
        </Form.Group>
        <Form.Group className='col-md-6' controlId="formBasiail">
          <Form.Label className='col-md-2'>To:</Form.Label>
          <DatePicker name='endDate' selected={endDate} maxDate={new Date()} disabled={isPresentChecked} onChange={date => setEndDate(date)} />
          <span className='col-md-1' />
          <Form.Check className='col-md-1' onChange={presentCheckHandler} inline label='Present' type='checkbox' id='present-checkbox' />
        </Form.Group>
        <Form.File
          id="custom-file"
          label={`Upload ${isPresentChecked ? 'Offer' : 'Experience'} Letter`}
          onChange={fileChangeHandler}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Work Descreption</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Organization Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" />
      </Form.Group>
      <Button disabled={!isAddEnabled} onClick={addButtonHandler}>Save</Button>
    </div>
  );
};

export default ExperienceForm;