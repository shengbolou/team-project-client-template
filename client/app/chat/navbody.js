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
                  this.state.data.fullname === undefined ? null:
                  (this.state.data.friends.length===0 ? alert : this.state.data.friends.map((friend)=>{
                    return <NavChatItem
                      key={friend._id}
                      data={friend}
                      currentUser={this.state.data._id}
                      switchUser={this.props.switchUser}
                      lastmessage={this.state.data.sessions.filter((session) => {
                        if(session.users.indexOf(friend._id)!==-1){
                          return true;
                        }
                        return false;
                      })[0].lastmessage}/>
                    }))
                  }
                </ul>
            </div>
        )
    }

}
