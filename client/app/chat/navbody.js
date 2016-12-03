import React from 'React';
import NavChatItem from './navchatitem';

export default class NavBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(newProps){
      this.state = newProps;
    }

    render() {
        return (
            <div className="panel-body">
                <ul className="list-group friends" style={{
                    'marginBottom': '0',
                    'marginTop': '-1'
                }}>

                  {this.props.data.firstname === undefined ? 0:this.props.data.friends.map((item)=>{
                  return <NavChatItem key={item._id}
                                      data={item}
                                      currentUser={this.props.data._id}
                                      last={this.props.data.sessions.map((item2)=>{
                                        if(item._id==item2.users[0]||item._id==item2.users[1]){
                                        return item2.lastmessage;}  })}
                                      switchUser={this.props.switchUser}/>
                })}

                </ul>
            </div>
        )
    }

}
