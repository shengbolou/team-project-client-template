import React from 'React';
import {getUserData} from '../server';
import {Link} from 'react-router';
import ChatEntry from './chatentry';

export default class ChatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getData();
    }

    handlePostMessage(text){
      this.props.onPost(text);
    }

    getData() {
        getUserData(this.props.target, (userData) => {
            this.setState(userData)
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
                              <Link to={"profile/"+this.state._id}>
                                <img className="media-object" src={this.state.avatar } alt="image" height="45" width="45"></img>
                                </Link>
                          </div>
                            <div className="media-body">
                                <div className="media-heading">

                                    <div className="media">
                                        <div className="media-left media-body">
                                            <font size="3">{this.state.firstname} {this.state.lastname}</font>
                                        </div>

                                    </div>
                                </div>
                                <font size="2" color="grey ">
                                    {this.state.description}</font>
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

                    <ChatEntry onPost={(message)=>this.handlePostMessage(message)}/>
                </div>
            </div>

        )
    }
}
