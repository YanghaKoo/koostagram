import React from 'react';

import PostTemplateContainer from '../containers/post/PostTemplateContainer';

const EachPostPage = ({match}) => {
  return (
    <div>      
      <PostTemplateContainer match={match}/>
    </div>
  );
};

export default EachPostPage;