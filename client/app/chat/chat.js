import React from 'react';
import Navbar from '../component/navbar';
import NavHeading from './navheading';
import NavBody from './navbody';
import ChatWindow from './chatwindow';
import ChatRightBubble from './chatrightbubble';
import ChatLeftBubble from './chatleftbubble';
import {getUserData,getMessages,postMessage} from '../server';

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
      this.setState({friend:friendId});
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
                          <ChatWindow target={this.state.friend} onPost={(message)=>this.handlePostMessage(message)}>
                            {this.state.message === undefined ? 0: this.state.message.map((msg,i)=>{
                              if(msg.sender._id===this.state.user._id){
                                return (
                                  <ChatRightBubble key={i} data={msg} />
                                )
                              }
                              else{
                                return (
                                  <ChatLeftBubble key={i} data={msg} />
                                )
                              }
                            })}
                          </ChatWindow>
                    </div>

                </div>

            </div>
        );
    }


}
