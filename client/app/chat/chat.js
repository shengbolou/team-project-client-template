import React from 'react';
import Navbar from '../component/navbar';
import NavBody from './navbody';
import ChatWindow from './chatwindow';
import {getUserData,getMessages,postMessage,getSessionId} from '../server';
import {socket} from '../credentials';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      message :[],
      friend: "",
      sessionId:"",
      btnText:"load earier messages"
    };
  }

  componentDidMount() {
    this.getData();
    socket.on('online',(user)=>{
      if(this.state.user.friends.filter((item) => {if(item._id===user)return true;else return false;}).length>0)
      getUserData(this.props.user, (userData) => {
        this.setState({
          user:userData
        });
      });
    })
  }

  componentWillUpdate(){
    socket.removeAllListeners("chat");
  }

  componentDidUpdate(){
    socket.on('chat',()=>{
      getSessionId(this.props.user,this.state.friend,(session)=>{
        this.setState({
          sessionId:session._id
        },
        ()=>{
          getMessages((new Date().getTime()),this.props.user,this.state.sessionId,(message)=>{
            this.setState({
              message:message
            },()=>{
              getUserData(this.props.user, (userData) => {
                this.setState({
                  user:userData,
                  btnText:"load earier messages"
                });
              });
            })
          });
        })
      });
    });
  }

  getData() {
    getUserData(this.props.user, (userData) => {
      this.setState({
        user:userData
      },()=>{
        this.setState({friend:this.state.user.friends[0]._id},()=>{
          getSessionId(this.props.user,this.state.friend,(session)=>{
            this.setState({
              sessionId:session._id
            },
            ()=>{
              getMessages((new Date().getTime()),this.props.user,this.state.sessionId,(message)=>{
                this.setState({
                  message:message,
                  btnText:"load earier messages"
                })
              });
            });
          });})
        })
      });
    }

  handlePostMessage(message){
    socket.emit('chat',{currUser:this.props.user,friend:this.state.friend});
    postMessage(this.state.sessionId, this.props.user, this.state.friend ,message, (newMessage)=>{
      this.setState({message:newMessage},()=>{
        getUserData(this.props.user, (userData) => {
          this.setState({
            user:userData,
            btnText:"load earier messages"
          })
        });
      });
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
            getMessages((new Date().getTime()),this.props.user,this.state.sessionId,(message)=>{
              this.setState({
                message:message
              },()=>{
                getUserData(this.props.user, (userData) => {
                  this.setState({
                    user:userData,
                    btnText:"load earier messages"
                  })
                })
              })
            });
          });
        });
      });
    }
    handleLoadMessage(e){
      e.preventDefault();
      var time = this.state.message.length===0?(new Date().getTime()):this.state.message[0].date;
      getMessages(time,this.props.user,this.state.sessionId,(messages)=>{
        if(messages.length===0){
          return this.setState({
            btnText: "no new messages"
          })
        }
        var newMessages = messages.concat(this.state.message);
        this.setState({
          message:newMessages
        });
      });
    }

    render() {
      var chatwindow =
      (
        <ChatWindow target={this.state.friend} curUser={this.props.user}
          onPost={(message)=>this.handlePostMessage(message)}
          message={this.state.message}
          onLoad={(e)=>this.handleLoadMessage(e)}
          btnText={this.state.btnText}>
        </ChatWindow>
      );
      if(this.state.user.friends === undefined? true: this.state.user.friends.length === 0){
        chatwindow = (
          <div className="col-md-7 col-sm-7 col-xs-7">
            <div className="alert alert-info" role="alert">
              You don't have any chats yet
            </div>
          </div>)
        }
        return (
          <div style={{marginTop:'70'}}>
            <Navbar chat="active" user={this.state.user}/>
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-5 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 chat-left">
                  <div className="panel panel-dafault">
                    <div className="panel-heading panel-heading-chat" style={{paddingBottom:"3px"}}>
                      <ul className="nav nav-pills nav-justified" >
                        <li role="presentation" className="active">
                          <a>Friends</a>
                        </li>
                      </ul>
                    </div>
                    <NavBody data={this.state.user} activeFriend={this.state.friend} switchUser={(id)=>this.handleSwitchFriends(id)}/>
                  </div>
                </div>
                {chatwindow}
              </div>

            </div>

          </div>
        );
      }
    }
