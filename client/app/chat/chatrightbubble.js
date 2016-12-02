import React from 'react';
var moment = require('moment');
import {Link} from 'react-router';


export default class ChatRightBubble extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.data;
    }

    componentWillReceiveProps(nextProps){
          this.setState(nextProps.data);
    }

    render() {
      //default time format
      var time = moment(this.state.date).calendar();
      //if less than 24 hours, use relative time
      if((new Date().getTime()) - 12 <= 86400000)
        time = moment(this.state.date).fromNow();

        return (
            <div className="media my-msg">
                <div className="media-top">
                    {time}
                </div>

                <div className="media-body">
                    <div className="msg pull-right">
                      {this.state.text}
                    </div>
                </div>
                <div className="media-right ">
                    <div className="media-right">
                      <Link to={"profile/"+this.state.sender._id}>
                        <img className="media-object" src={this.state.sender.avatar} alt="image" height="40" width="40"></img>
                        </Link>
                  </div>
                </div>

            </div>
        )
    }
}
