import React, { useState } from 'react';
import axios from '../axios-interceptor';
import Spinner from './UI/Spinner/Spinner';

const JobDetails = ({
  _id,
  type,
  created_at,
  company,
  company_url,
  location,
  title,
  description,
  isVerificationRequired,
  isGWVerified,
  isAuthenticated,
  close
}) => {

  const [loading, setLoading] = useState(false);

  const applyJobHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(`/apply/${_id}`);
    setLoading(false);
    close();
  };

  return (
    <div>
      {loading && <Spinner />}
      {isAuthenticated && isVerificationRequired && !isGWVerified &&
        <div className='style-info-msg-error'>
          <span className='info-msg'>This job requires you to be GW Verified. To apply, please complete the verification process</span>
        </div>}
      {
        isAuthenticated && isVerificationRequired && isGWVerified &&
        <div className='style-info-msg'>
          <span className='info-msg'>Your documents will be shared with the company.</span>
        </div>
      }
      <h2>{title}</h2>
      <div>
        <span>Company: </span>
        <span>{company}</span>
      </div>
      <div>
        <span>Type: </span>
        <span>{type}</span>
      </div>
      <div>
        <span>Posted on: </span>
        <span>{created_at}</span>
      </div>
      <div>
        <span>Website: </span>
        <a href={company_url}>{company_url}</a>
      </div>
      <div>
        <span>Location: </span>
        <span>{location}</span>
      </div>
      <div>
        <h3>Description: </h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        {/* <p>{description}</p> */}
      </div>
      <button onClick={applyJobHandler} className='apply-button' disabled={!isAuthenticated || (isVerificationRequired && !isGWVerified)}>Apply Now</button>
    </div >
  );
};

export default JobDetails;