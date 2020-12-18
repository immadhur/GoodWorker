import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateJobsList, getJobDetails } from '../store/actions/jobAction';
import Job from './Job';
import JobDetails from './JobDetails';
import DialogBoxModel from './UI/DialogBoxModel/DialogBoxModel';
import Spinner from './UI/Spinner/Spinner';

const JobsList = ({ jobsList, updateJobsList, isGWVerified, selectedJob, getJobDetails, isAuthenticated, loading }) => {
  useEffect(() => {
    updateJobsList();
  }, [updateJobsList]);

  const getJobDetailsHandler = useCallback((jobId) => {
    getJobDetails(jobId);
  }, [getJobDetails]);

  const clearSelectedJobHandler = () => {
    getJobDetails();
  };

  const closeAndUpdateList = () => {
    getJobDetails();
    updateJobsList();
  };

  return (
    <>
      <DialogBoxModel show={Object.keys(selectedJob).length > 0} close={clearSelectedJobHandler} >
        <JobDetails {...selectedJob} isGWVerified={isGWVerified} close={closeAndUpdateList} isAuthenticated={isAuthenticated} />
      </DialogBoxModel>
      {loading && <Spinner />}
      {isAuthenticated ? isGWVerified ?
        <h3>Congrats! You are GW Verified</h3>
        : <h3>You are not GW Verified</h3> : ''}
      <p>{isAuthenticated ? 'Here are jobs for you' : 'Login to view and apply jobs'}</p>
      <div className='jobs-wrapper'>
        {jobsList.map(job => (
          <Job {...job} key={job._id} isAuthenticated={isAuthenticated} isGWVerified={isGWVerified} jobClick={getJobDetailsHandler} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    jobsList: state.jobs,
    selectedJob: state.selectedJob,
    isGWVerified: state.isGWVerified,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading
  };
};

export default connect(mapStateToProps, {
  updateJobsList,
  getJobDetails
})(JobsList);