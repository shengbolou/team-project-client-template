import React from 'React';
import NavChatItem from './navchatitem';
import NavFriendItem from './navfrienditem';


export default class NavBody extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="panel-body">
          <ul className="list-group friends" style={{
              'marginBottom': '0',
              'marginTop': '-1'
          }}>
          <NavChatItem avator="img/user.png" user="someone" date="some date" lastmessage="last message"/>
          <NavChatItem avator="img/user.png" user="someone2" date="some date" lastmessage="last message2"/>
           <NavFriendItem avator="img/user.png" user="someone2" />
          </ul>
      </div>
    )
  }
}
