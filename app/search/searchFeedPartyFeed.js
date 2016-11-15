import React from 'react';
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
          <h3>Activity Posts</h3>
        </div>
        <div className="panel-body">
          <SearchFeedPartyFeedItem Activity={1}/>
        </div>
      </div>

    );
  }

}
