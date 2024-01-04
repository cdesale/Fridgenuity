import React from 'react';

const Error = ({ errors }) => {
  if (!errors.length) return null;

  return (
    <div className="error-messages" style={{background:'white'}}>
      {errors.map((error, index) => (
        <div key={index} className="error-message">
          {error}
        </div>
      ))}
    </div>
  );
};

export default Error;
