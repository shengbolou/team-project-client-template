import React from 'React';
import {Link} from 'react-router';

export default class Ad_signeduser extends React.Component{
  constructor(props){
    super(props);
    this.state = props.data;
  }

    render(){
      return(

        <Link to={"profile/"+this.state._id}>
          <img src={this.state.avatar} width="35px" alt=""/>
        </Link>
      )
    }
}
