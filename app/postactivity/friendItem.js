import React from 'react';
import {Link} from 'react-router';

export default class FriendItem extends React.Component{
  render(){
    return(
      <li className="media" style={{
          "paddingLeft":'10',
          "paddingBottom":'10',
          "paddingTop":'10',
          "marginTop":'-20'
        }}>
        <div className="media-left">
          <Link to="profile.html">
            <img className="media-object" src={this.props.data.avatar} width="45px" alt="..." />
          </Link>
        </div>
        <div className="media-body media-top">
          {this.props.data.firstname} {this.props.data.lastname}<br/>
        <font color="grey">{this.props.data.description}</font>
      </div>
      <div className="media-body media-right" align="right" style={{"paddingRight":'20'}}>
        <button type="button" className="btn btn-default btn-blue-grey pull-right"  name="button">Invite</button>
      </div>
      <hr/>
    </li>
    );
  }
}
