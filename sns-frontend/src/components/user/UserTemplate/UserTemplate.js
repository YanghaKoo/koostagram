import React from 'react';
import './UserTemplate.css'
import Profile from 'components/user/Profile'
import Header from 'components/common/Header'
import Posts from '../Posts';

const UserTemplate = () => {
  return (
    <div>
      <Profile />
      <Posts/>
    </div>
  );
};

export default UserTemplate;