import React from 'react';

const Job = ({ title, company, type, location, jobClick, _id, isVerificationRequired, isGWVerified, isAuthenticated }) => {
  return (
    <div className={`job-container ${isAuthenticated && isVerificationRequired && !isGWVerified && 'container-disabled'}`} onClick={() => jobClick(_id)}>
      <div className='job-details'>
        <div className='job-left'>
          <h2>{title}</h2>
          <h3>{company}</h3>
          <p>KEYWORDS: ReactJS, NodeJS, Javascript, HTML, CSS, Redux, ES6, github</p>
        </div>
        <div className='job-right'>
          <p>{type}</p>
          <p>{location}</p>
        </div>
      </div>
      {isVerificationRequired && <p className='verification-label'>GoodWorker verification Required</p>}
    </div>
  );
};

export default React.memo(Job);