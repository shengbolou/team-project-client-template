import React from 'react';

export default class NavHeading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="panel-heading panel-heading-chat">
                <ul className="nav nav-pills nav-justified">
                    <li role="presentation" className={this.props.chat}>
                        <a>Chats</a>
                    </li>
                    <li role="presentation" className={this.props.friends}>
                        <a href="#">Friends</a>
                    </li>
                </ul>
            </div>

        )
    }
}
