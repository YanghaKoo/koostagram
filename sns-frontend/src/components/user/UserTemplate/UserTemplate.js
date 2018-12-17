import React from 'react';
import './UserTemplate.scss'
import Posts from '../Posts';
import ProfileContainer from '../../../containers/user/ProfileContainer';

const UserTemplate = () => {

    
  return (
    <div>      
      <ProfileContainer/>
      <Posts/>
    </div>
  );
};

export default UserTemplate;