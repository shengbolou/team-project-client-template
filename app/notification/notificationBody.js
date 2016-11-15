import React from 'react';
import Request from './friendRequest';
import NewsFeed from './newsFeed'
import {getNotificationData, deleteNotification,acceptRequest} from '../server';

export default class NotificationBody extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      FR: [],
      NF: []
    }
  }

  getData(){
    getNotificationData(this.props.user,(notificationData)=>{
      var FR = [];
      var NF = [];
      notificationData.contents.map((notification)=>{
        if(notification.type === "FR"){
          FR.push(notification);
        }
        else{
          NF.push(notification);
        }
      });
      this.setState({
        FR: FR,
        NF: NF
      });
    })
  }

  handleDelete(id){
    deleteNotification(id,this.props.user,()=>{
      this.getData();
    });
  }

  handleAccept(id){
    acceptRequest(id,this.props.user,()=>{
      this.getData();
    });
  }

  render(){
    if(this.props.id == 1){
      if(this.state.FR.length === 0){
        return(
          <div className="panel panel-default">
            <div className="panel-body">
                  Nothing here yet
            </div>
          </div>
        );
      }
      return(
        <div className="panel panel-default">
          <div className="panel-body">
            {this.state.FR.map((fr,i)=>{
              return <Request key={i} data={fr} onDelete={(id)=>this.handleDelete(id)} onAccept={(id)=>this.handleAccept(id)}/>
            })}
          </div>
        </div>
      )
    }
    else{
      if(this.state.NF.length === 0){
        return(
          <div className="panel panel-default">
            <div className="panel-body">
              Nothing here yet
            </div>
          </div>
        );
      }
      return(
        <div className="panel panel-default">
          <div className="panel-body">
            {this.state.NF.map((nf,i)=>{
              return <NewsFeed key={i} data={nf} onDelete={(id)=>this.handleDelete(id)}/>
            })}
          </div>
        </div>
      )
    }
  }

  componentDidMount(){
    this.getData();
  }
}
