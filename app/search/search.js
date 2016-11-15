import React from 'react';
import SearchFeed from './searchFeed';
import Navbar from '../component/navbar';
import {getUserData} from '../server';


export default class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  getData(){
    getUserData(this.props.user,(userData)=>{
        this.setState(userData);
    });
  }


  render(){
    return(
      <div>
        <Navbar search="active" user={this.state}/>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 main-feed">
              <SearchFeed/>
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
