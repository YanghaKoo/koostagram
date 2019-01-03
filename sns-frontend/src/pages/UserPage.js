import React from 'react';
import ProfileContainer from 'containers/user/ProfileContainer';
import Posts from 'components/user/Posts'
import {withRouter} from 'react-router-dom'

const UserPage = ({match, history}) => {
  const { userid : uid } = match.params;
  return (
    <div>
      <ProfileContainer uid={uid} match={match} history={history}/>
      <Posts uid={uid}/>
    </div>
  );
};

export default withRouter(UserPage)