import React from 'react';
import SearchEntry from './searchEntry';
import SearchFeedUserFeed from './searchFeedUserFeed';
import SearchFeedPartyFeed from './searchFeedPartyFeed';

export default class SearchFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div>
        <SearchEntry user={this.props.user}/>
        <SearchFeedUserFeed/>
        <SearchFeedPartyFeed/>
      </div>
    );
  }



}
