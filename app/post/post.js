import React from 'react';
import PostEntry from './postEntry';
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
            <div className="col-md-7 col-md-offset-2 main-feed">
              <PostEntry user={this.state} />
              <PostFeed user={this.props.user} />
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
