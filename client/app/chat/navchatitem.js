import React from 'React';
import {Link} from 'react-router';

export default class NavChatItem extends React.Component {
    constructor(props) {
        super(props);
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
                                    <font size="3">{this.props.data.firstname} {this.props.data.lastname}</font>
                                </div>
                                <div className="media-body text-right" style={{
                                    'paddingRight': '0px'
                                }}>
                                    <font size="2%" color="grey">{this.props.data.date}</font>
                                </div>
                            </div>
                        </div>
                        <font size="2" color="grey ">
                            {this.props.last}</font>
                    </div>
                </div>
            </li>
        )
    }

}
