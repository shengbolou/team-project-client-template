import React from 'react';
var moment = require('moment');

export default class ChatRightBubble extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.data;
    }

    render() {
      //default time format
      var time = moment(12).calendar();
      //if less than 24 hours, use relative time
      if((new Date().getTime()) - 12 <= 86400000)
        time = moment(12).fromNow();

        return (
            <div className="media my-msg">
                <div className="media-top">
                    {time}
                </div>

                <div className="media-body">
                    <div className="msg pull-right">
                      {12}
                    </div>
                </div>
                <div className="media-right ">
                    <a className="media-right" href="#">
                        <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                    </a>
                </div>

            </div>
        )
    }
}
