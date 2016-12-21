import React from 'React';
import {Link} from 'react-router';
import {hideElement} from '../util'
// var debug = require('react-debug');

export default class NavChatItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          online:false
        }
    }

    handleClick(e){
      e.preventDefault();
      this.props.switchUser(this.props.data._id);
    }


    render() {
        return (
            <li className="list-group-item" onClick={(e)=>this.handleClick(e)}>
                <div className="media">
                  <div className="media-left">
                    <Link to={"profile/"+this.props.data._id}>
                      <img className="media-object" src={this.props.data.avatar} alt="image" height="45" width="45"></img>
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="media-heading">
                      <div className="media">
                        <div className="media-left media-body">
                          <font size="3">{this.props.data.fullname}</font>
                        </div>
                        <div className="media-body text-right" style={{
                            'paddingRight': '0px'
                          }}>
                          <i className="fa fa-circle" aria-hidden="true" style={{
                                color:this.props.data.online? 'green':'grey'
                            }}>
                          </i>
                        </div>
                      </div>
                    </div>
                    <font size="2" color="grey">
                      {this.props.lastmessage===undefined||
                        Object.keys(this.props.lastmessage).length===0?"":
                        (this.props.lastmessage.text.length>35?this.props.lastmessage.text.substring(0,35)+"...":this.props.lastmessage.text)}
                      <span className={"label label-danger "+
                        hideElement(this.props.lastmessage===undefined||
                          Object.keys(this.props.lastmessage).length===0||
                          this.props.lastmessage.isread ||
                          this.props.lastmessage.sender===this.props.currentUser)}
                      style={{marginLeft:5}}>New</span>
                    </font>
                  </div>
                </div>
            </li>
        )
    }

}
