import React from 'react';
import SearchFeedUserFeedItem from './searchFeedUserFeedItem';
import SearchFeedPartyFeedItem from './searchFeedPartyFeedItem';
export default class SearchFeedPartyFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div className="panel panel-default searching-event">
        <div className="panel-heading">
          <h3>Parties Posts</h3>
        </div>
        <div className="panel-body">
          <SearchFeedPartyFeedItem Activity={1}/>
          <SearchFeedPartyFeedItem Activity={2}/>
          <SearchFeedPartyFeedItem Activity={3}/>
        </div>
      </div>

    );
  }



}
