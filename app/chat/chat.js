import React from 'react';
import Navbar from '../component/navbar';
import NavHeading from './navheading';
import NavBody from './navbody';
import ChatWindow from './chatwindow';
import {getUserData} from '../server';
import {getMessages} from '../server';
import ChatRightBubble from './chatrightbubble';
import ChatLeftBubble from './chatleftbubble';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {}
        ,
          message :{}
        };
    }

    getData() {
        getUserData(this.props.user, (userData) => {
            this.setState({user:userData});
        });
        getMessages(1,(message)=>{
          this.setState({message: message})
        })

    }
    handlePostMessage(message){
      postMessage(this.props.userdata._id, this.props.target ,message, (newMessage)=>{
        this.setState({message:newMessage});
      })
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
                                <NavBody data={this.state.user}/>
                            </div>
                        </div>

                          <ChatWindow userdata={this.state.user} messages={this.state.message} length={this.state.message.length} target={2} onPost={(message)=>this.handlePostMessage(message)}>



                                  {this.state.message.messages === undefined ? 0:this.state.message.messages.map((message,i)=>{
                                    if(message.sender==this.state.user._id){
                                    return (
                                      <ChatRightBubble key={i} data={message} />
                                    )}
                                    else{
                                    return (
                                      <ChatLeftBubble key={i} data={message} />
                                    )}
                                  })}


                          </ChatWindow>
                    </div>

                </div>

            </div>
        );
    }

    componentDidMount() {
        this.getData();
    }
}
