import React from 'React';
import Navbar from '../component/navbar';
import Ad_body from './ad_body';
import Ad_comment from './ad_comment';
import {getUserData} from '../server';

export default class Activity_detail extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  getData(){
    getUserData(this.props.user,(data)=>{
      this.setState(data);
    });
  }

  render(){
    return(
      <div>
      <Navbar activity="active" user={this.state}/>
      <Ad_body id={this.props.id}/>
      </div>
    )
  }

  componentDidMount() {
      this.getData();
  }
}
