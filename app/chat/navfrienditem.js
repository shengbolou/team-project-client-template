import React from 'React';

export default class NavFriendItem extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
      return(
        <li className="list-group-item list-group-item-friend">
            <div className="media">
                <a className="media-left" href="#">
                    <img className="media-object" src={this.props.avator} alt="image" height="45" width="45"></img>
                </a>
                <div className="media-body">
            <font size="3">{this.props.user}</font>
                </div>
            </div>
        </li>
      )
    }

}
