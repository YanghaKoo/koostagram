import React from 'react';
import ProfileContainer from 'containers/user/ProfileContainer';
import Posts from 'components/user/Posts'
import {withRouter} from 'react-router-dom'
import './UserPage.scss'

const UserPage = ({match, history}) => {
  const { userid : uid } = match.params;
  return (
    <div className="userpage-container">
      <ProfileContainer uid={uid} match={match} history={history}/>
      <Posts uid={uid}/>
    </div>
  );
};

export default withRouter(UserPage)