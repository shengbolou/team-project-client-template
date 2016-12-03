import React from 'react';
import PostFeed from './postFeed';
import Navbar from '../component/navbar';
import {getUserData} from '../server';

export default class Post extends React.Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  getData(){
    getUserData(this.props.user,(userData)=>{
        this.setState(userData);
    });
  }

  render(){
    return(
      <div>
        <Navbar post="active" user={this.state}/>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 main-feed">
              <PostFeed user={this.state} userId={this.props.user}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.getData();
  }
}
