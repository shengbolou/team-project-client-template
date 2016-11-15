import React from 'react';
import SearchFeedUserFeedItem from './searchFeedUserFeedItem';

export default class SearchFeedUserFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div className="panel panel-default searching-user">
        <div className="panel-heading">
          <h3>User</h3>
        </div>
        <div className="panel-body">
          <SearchFeedUserFeedItem user={1}/>
          <SearchFeedUserFeedItem user={2}/>
          <SearchFeedUserFeedItem user={3}/>
        </div>
      </div>
    );
  }


}
