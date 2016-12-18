import React from 'React';
import NavChatItem from './navchatitem';

export default class NavBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillReceiveProps(newProps){
      this.setState(newProps);
    }

    getLastmessage(friendId){
      var filterResult = this.state.data.sessions.filter((session) => {
        if(session.users.indexOf(friendId)!==-1){
          return true;
        }
        return false;
      });

      if(filterResult.length===0){
        return undefined;
      }
      else{
        return filterResult[0].lastmessage;
      }

    }

    render() {
      var alert =
      (<div className="alert alert-info" role="alert">
          You don't have any friends yet.
        </div>);

        return (
            <div className="panel-body">
                <ul className="list-group friends" style={{
                    'marginBottom': '0',
                    'marginTop': '-1'
                }}>
                {
                  this.state.data === undefined ? null:
                  (this.state.data.friends===undefined || this.state.data.friends.length===0 ? alert : this.state.data.friends.map((friend)=>{
                    return <NavChatItem
                      key={friend._id}
                      data={friend}
                      activeFriend = {this.props.activeFriend}
                      currentUser={this.state.data._id}
                      switchUser={this.props.switchUser}
                      lastmessage={this.getLastmessage(friend._id)}/>
                    }))
                  }
                </ul>
            </div>
        )
    }

}
