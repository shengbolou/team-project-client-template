import React from 'React';

export default class NavChatItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                <div className="media">
                    <a className="media-left" href="#">
                        <img className="media-object" src={this.props.avator} alt="image" height="45" width="45"></img>
                    </a>
                    <div className="media-body">
                        <div className="media-heading">
                            <div className="media">
                                <div className="media-left media-body">
                                    <font size="3">{this.props.user}</font>
                                </div>
                                <div className="media-body text-right" style={{
                                    'paddingRight': '0px'
                                }}>
                                    <font size="2%" color="grey">{this.props.date}</font>
                                </div>
                            </div>
                        </div>
                        <font size="2" color="grey ">
                            {this.props.lastmessage}</font>
                    </div>
                </div>
            </li>
        )
    }

}
