import React from 'react';

export default class ChatList extends React.Component {
    render() {
        return (
            <div className="panel-body">
                <ul className="list-group friends" style={{
                    'marginBottom': '0px',
                    'marginTop': '-1px'
                }}>
                    <li className="list-group-item">
                        <div className="media">
                            <a className="media-left" href="#">
                                <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                            </a>
                            <div className="media-body">
                                <div className="media-heading">
                                    <div className="media">
                                        <div className="media-left media-body">
                                            <font size="3">Name 1</font>
                                        </div>
                                        <div className="media-body text-right" style={{
                                            'paddingRight': '0px'
                                        }}>
                                            <font size="2%" color="grey">16:00 09/24</font>
                                        </div>
                                    </div>
                                </div>
                                <font size="2" color="grey ">
                                    The last messege from Name 1</font>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
