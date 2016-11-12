import React from 'react';
import Request from './friendRequest';
import NewsFeed from './newsFeed'

export default class NotificationBody extends React.Component{
  render(){
    var content = <Request />;
    if(this.props.id == 2){
      content = <NewsFeed />
    }
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          {content}
        </div>
      </div>
    );
  }
}
