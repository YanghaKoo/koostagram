import React from 'react';
import ProfileContainer from 'containers/user/ProfileContainer';
import Posts from 'components/user/Posts'
import {withRouter} from 'react-router-dom'

// 나중에 버튼으로 세션으로 ~~
const UserPage = ({match}) => {
  const { userid : uid } = match.params;
  return (
    <div>
      <ProfileContainer uid={uid} match={match}/>
      <Posts uid={uid}/>
    </div>
  );
};

export default withRouter(UserPage)