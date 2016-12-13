import React from 'react';
import Navbar from '../component/navbar';
import NavBody from './navbody';
import ChatWindow from './chatwindow';
import {chatNotification,getUserData,getMessages,postMessage,getSessionId,isChatNotificationRunning} from '../server';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      message :[],
      friend: "",
      sessionId:"000000000000000000000001"
    };
  }
  componentDidMount() {
    this.getData();
    this.getNotification();
  }


  // componentWillUnmount(){
  //   clearChatTime();
  // }

  getData() {
    getUserData(this.props.user, (userData) => {
      this.setState({
        user:userData
      },()=>{
        this.setState({friend:this.state.user.friends[0]._id},()=>{    getSessionId(this.props.user,this.state.friend,(session)=>{
          this.setState({
            sessionId:session._id
          },
          ()=>{
            getMessages(this.props.user,this.state.sessionId,(message)=>{
              this.setState({
                message:message
              })
            });
          });
        });})
      })
    });
  }

  getNotification(){
    if(!isChatNotificationRunning()){
      chatNotification(this.props.user,(sessions)=>{
        var currsessions = this.state.user.sessions;
        for(var i=0; i<currsessions.length; i++){
          if(currsessions[i].lastmessage!==sessions[i].lastmessage){
            this.getData();
            return;
          }
        }
      });
    }
  }

  handlePostMessage(message){
    postMessage(this.state.sessionId, this.props.user, this.state.friend ,message, (newMessage)=>{
      this.setState({message:newMessage});
    })
    getUserData(this.props.user, (userData) => {
      this.setState({
        user:userData
      })
    });
  }

  handleSwitchFriends(friendId){
    this.setState({friend:friendId},
      ()=>{
        getSessionId(this.props.user,this.state.friend,(session)=>{
          this.setState({
            sessionId:session._id
          },
          ()=>{
            getMessages(this.props.user,this.state.sessionId,(message)=>{
              this.setState({
                message:message
              })
            });
          });
        });
      });

    }

    render() {
      var chatwindow =   (<ChatWindow target={this.state.friend} curUser={this.props.user}onPost={(message)=>this.handlePostMessage(message)}
      message={this.state.message}>
    </ChatWindow>);
    if(this.state.message.length === 0){
      chatwindow = (
        <div className="col-md-7 col-sm-7 col-xs-7">
          <div className="alert alert-info" role="alert">
            You don't have any chats yet
          </div>
        </div>)
      }
      return (
        <div>
          <Navbar chat="active" user={this.state.user}/>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4 col-xs-4 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 chat-left">
                <div className="panel panel-dafault">
                  <div className="panel-heading panel-heading-chat" style={{paddingBottom:"3px"}}>
                    <ul className="nav nav-pills nav-justified" >
                      <li role="presentation" className="active">
                        <a>Friends</a>
                      </li>
                    </ul>
                  </div>
                  <NavBody data={this.state.user}  messages={this.state.message} switchUser={(id)=>this.handleSwitchFriends(id)}/>
                </div>
              </div>
              {chatwindow}
            </div>

          </div>

        </div>
      );
    }


  }
