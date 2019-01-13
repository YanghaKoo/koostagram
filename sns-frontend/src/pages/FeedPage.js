import React from 'react';
import FeedContainer from '../containers/feed/FeedContainer';
import qs from 'query-string'

const FeedPage = ({location}) => {
  const query = qs.parse(location.search).hashtag  
  return (
    <div>
      <FeedContainer ht={query}/>
    </div>
  );
};

export default FeedPage;