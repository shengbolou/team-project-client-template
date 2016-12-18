import React from 'react';
import {Link} from 'react-router';
import {hideElement} from '../util';
import {addFriend} from '../server';
import {socket,getToken} from '../credentials';

export default class SearchFeedUserFeedItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: props.data,
      sucess:false
    }
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data
    });
  }

  checkFriendsOfUser(){
    return this.props.currentUser.friends.filter((friend)=>{
      if(friend._id===this.state.data._id)
        return true;
      else return false;
    }).length>0;
  }

  handleAddFriend(e){
    e.preventDefault();
    addFriend(this.props.currentUser._id,this.state.data._id,(success)=>{
      if(success){
        this.setState({
          success:true
        });

        socket.emit('notification',{
          authorization:getToken(),
          sender: this.props.currentUser._id,
          target: this.state.data._id
        });
      }
    });
  }

  render(){
    return(
      <div className="panel panel-default" style={{padding: '10'}}>
        <div className={"alert alert-success "+hideElement(!this.state.success)} role="alert">Request sent!</div>
        <div className="media">
          <div className="media-left">
            <Link to={"profile/"+this.state.data._id}>
              <img className="media-object" src={this.state.data.avatar} width="50px" height="50px" alt="..." />
            </Link>
          </div>
          <div className="media-body">
            <div className="row">
              <div className="col-md-8">
                <h4 className="media-heading">{this.state.data.fullname}</h4>
                {this.state.data.description}
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12">
                    <a href="#" onClick={(e)=>this.handleAddFriend(e)}><i className={"fa fa-user-plus pull-right "+hideElement(this.checkFriendsOfUser()||this.state.data._id===this.props.currentUser._id)} aria-hidden="true"></i></a>
                    <i className={"fa fa-check pull-right "+hideElement(!this.checkFriendsOfUser())} style={{color:'green'}} aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
