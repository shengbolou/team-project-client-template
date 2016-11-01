import React from 'react';
import PostEntry from './postEntry';
import PostFeed from './postFeed';
import Navbar from './navbar';

export default class Post extends React.Component{
  render(){
    return(
      <div>
        <Navbar post="active" />
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-2 main-feed">
              <PostEntry />
              <PostFeed />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
