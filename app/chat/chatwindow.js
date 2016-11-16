import React from 'React';
import {getUserData} from '../server';
import {postMessage} from '../server';
import {Link} from 'react-router';
import ChatEntry from './chatentry';

export default class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          target: {}
        ,
          message :{}
        };
    }

    componentDidMount() {
        this.getData();
    }

    handlePostMessage(text){
      postMessage(1,this.props.userdata._id,this.props.target,text ,(newMessage) => {
        this.setState({message:newMessage});
      })
    }

    getData() {
        getUserData(this.props.target, (userData) => {

            this.setState({target: userData})
        });

    }

    render() {
        return (
            <div className="col-md-7 col-sm-7 col-xs-7 chat-right" style={{
                'paddingLeft': '0px'
            }}>
                <div className="panel panel-dafault" style={{
                    'height': '107%'
                }}>
                    <div className="panel-heading panel-heading-chatwindow">
                        <div className="media">
                            <div className="media-left">
                              <Link to={"profile/"+this.state.target._id}>
                                <img className="media-object" src={this.state.target.avatar } alt="image" height="45" width="45"></img>
                                </Link>
                          </div>
                            <div className="media-body">
                                <div className="media-heading">

                                    <div className="media">
                                        <div className="media-left media-body">
                                            <font size="3">{this.state.target.firstname} {this.state.target.lastname}</font>
                                        </div>

                                    </div>
                                </div>
                                <font size="2" color="grey ">
                                    {this.state.target.description}</font>
                            </div>
                        </div>
                    </div>

                    <div className="panel-body panel-body-chatwindow" style={{'height': '60vh'}}>

                      {React.Children.map(this.props.children,function(child){
                        return (

                            child

                        );
                      })}

                    </div>

                    <ChatEntry sender={this.props.userdata} target={this.props.target} onPost={(message)=>this.handlePostMessage(message)}>

                    </ChatEntry>

                </div>
            </div>

        )
    }
}
