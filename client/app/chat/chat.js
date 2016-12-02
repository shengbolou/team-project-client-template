import React from 'react';
import Navbar from '../component/navbar';
import NavHeading from './navheading';
import NavBody from './navbody';
import ChatWindow from './chatwindow';
import {getUserData,getMessages,postMessage,getSessionId} from '../server';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {},
          message :[],
          friend: 2,
          sessionId:1
        };
    }
    componentDidMount() {
      getSessionId(this.props.user,this.state.friend,(session)=>{
        this.setState({
          sessionId:session._id
        })
      });
      this.getData();
    }

    getData() {
      getUserData(this.props.user, (userData) => {
        this.setState({
          user:userData
        })
      });

      getMessages(this.props.user,this.state.sessionId,(message)=>{
        this.setState({
          message:message
        })
      });

    }

    handlePostMessage(message){
      postMessage(this.state.sessionId, this.props.user, this.state.friend ,message, (newMessage)=>{
        this.setState({message:newMessage});
      })
    }

    handleSwitchFriends(friendId){
      this.setState({friend:friendId},()=>{
        getSessionId(this.props.user,this.state.friend,(session)=>{
          this.setState({
            sessionId:session._id
          },()=>{
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
        return (
            <div>
                <Navbar chat="active" user={this.state.user}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 chat-left">
                            <div className="panel panel-dafault">
                                <NavHeading chat="active"/>
                                <NavBody data={this.state.user} messages={this.state.message} switchUser={(id)=>this.handleSwitchFriends(id)}/>
                            </div>
                        </div>
                        <ChatWindow target={this.state.friend} curUser={this.props.user}onPost={(message)=>this.handlePostMessage(message)}
                          message={this.state.message}>
                        </ChatWindow>
                    </div>

                </div>

            </div>
        );
    }


}
