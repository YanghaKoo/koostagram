import React from 'react';
import RegisterForm from 'components/register/RegisterForm'

const RrgisterPage = ({history}) => {
  return (
    <div>      
      <RegisterForm history={history}/>
    </div>
  );
};

export default RrgisterPage;