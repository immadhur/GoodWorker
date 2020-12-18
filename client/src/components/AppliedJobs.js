import React, { useEffect } from 'react';
import Job from './Job';
import { connect } from 'react-redux';
import { getAppliedJobs } from '../store/actions/jobAction';

const AppliedJobs = ({ appliedJobs, getAppliedJobs, isGWVerified }) => {
  useEffect(() => {
    getAppliedJobs();
  }, [getAppliedJobs]);
  return (
    <div>
      <h2>Applied Jobs</h2>
      {appliedJobs.length === 0 && <p>No applied jobs</p>}
      <div className='jobs-wrapper'>
        {appliedJobs.map(job => (
          <Job {...job} key={job._id} isGWVerified={isGWVerified} jobClick={() => { }} />
        ))}
      </div>
    </div>
  );
};

export default connect(
  ({ appliedJobs, isGWVerified }) => {
    return { appliedJobs, isGWVerified };
  }, {
  getAppliedJobs
})(AppliedJobs);