import React from 'React';
import NavChatItem from './navchatitem';

export default class NavBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.data;
    }

    render() {
      var list =this.props.messages;
      var lastmessage;
      list.map((item)=>{
        lastmessage = item.text;
      })
        return (
            <div className="panel-body">
                <ul className="list-group friends" style={{
                    'marginBottom': '0',
                    'marginTop': '-1'
                }}>
                  {this.props.data.firstname === undefined ? 0:this.props.data.friends.map((item)=>{
                  return <NavChatItem key={item._id} data={item} currentUser={this.props.data._id} last={lastmessage} switchUser={this.props.switchUser}/>
                })}


                </ul>
            </div>
        )
    }

}
