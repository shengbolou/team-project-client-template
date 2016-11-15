import React from 'React';
import Ad_comment from './ad_comment';
import Ad_commentThread from './ad_commentThread';
import Ad_participates_item from './ad_participates_item';
import Ad_signeduser from './Ad_signeduser'
import {getActivityDetail} from '../server';
import {adpostComment} from '../server';
var moment = require('moment');

export default class Ad_body extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  handlePostComment(comment){
    adpostComment(this.state._id, this.props.currentUser ,comment, (newFeedItem)=>{
      this.setState(newFeedItem);
    })
  }

  getData(){
    getActivityDetail(this.props.id,(activitydata)=>{
      this.setState(activitydata);
    });
  }


  componentDidMount(){
    this.getData();
  }



  render(){
    var data = this.state;
    var contents;
    var img;
    switch(data.type){
      case "general":
        contents = data.contents;
        img = <img src={contents.img} width="100%" alt="" />;
        break;
      default:
      img = null;
    }

    return(
      <div className="activityDetail">
        <div className= "adbackground">
          <img src={this.state.img} />
        </div>
        <div className = "container">
          <div className="row">
            <div className = "col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1">
              <div className="panel panel-default body-title">
                <div className="panel-heading">

                  <div className = "row">
                    <div className = "col-md-8" >
                      <h2 style={{'paddingLeft':'15px'}}>{this.state.title}</h2>

                      <span className="glyphicon glyphicon-time" style={
                          {'paddingRight':'10px','paddingLeft': '15px'}
                        }></span>
                        {moment(this.state.startTime).format('MMMM Do YYYY, h:mm:ss a')}<br />

                      <span className="glyphicon glyphicon-map-marker"
                        style={{'paddingRight':'10px','paddingTop':'5px','paddingLeft': '15px'}}>
                      </span>
                      {this.state.location}

                    </div>

                    <div className = "col-md-4" style={{'paddingTop': '20px'}} >
                      <div className = "col-md-12 col-sm-12 col-xs-12 body-title-signed-in" align="left">
                        {this.state.participants === undefined ? 0:this.state.participants.length} people <font style={{'color':'grey'}}>signed up</font>

                      <font style={{'color':'#61B4E4','fontSize':'10px','paddingLeft':'10px','cursor':'pointer'}}
                        data-toggle="modal" data-target="#myModal"  >View All</font>

                      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h3 className="modal-title" id="myModalLabel">Participating users</h3>
                            </div>
                            <div className="modal-body">
                              <ul className="media-list">
                                {this.state.participants === undefined ? 0:this.state.participants.map((p,i)=>{
                                  return (
                                    <Ad_participates_item key={i} data={p} />
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br/>

                      {this.state.participants === undefined ? 0:this.state.participants.map((p,i)=>{
                        return (<Ad_signeduser key={i} data={p} />)
                      })}

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className = "col-md-12 col-sm-12 col-xs-12 remain-places" style={{'paddingTop':'25px',textAlign:"center"}} >
                    <a href="#"><span className="btn btn-default sign-up-btn"  align="center">Click to Sign Up</span></a>
                  </div>
                </div>

                <div className="row">
                  <div className = "col-md-12 col-sm-12 col-xs-12 body-title-icon" style={{textAlign:"right"}}>
                    <a href="#"><span className="glyphicon glyphicon-heart" style={{'marginRight':'15px'}}></span>11</a>
                    <a href="#"><span className="glyphicon glyphicon-comment" style={{'marginRight':'15px','marginLeft':'15px'}}></span>0</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="container-fluid body-detail">
                  <h4 style={{'color': 'grey'}}>Activity Details</h4>
                  <div className="row">
                    <div className="col-md-12" style={{'paddingTop':'20px'}}>
                      {img}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={{'paddingTop':'20px'}}>
                      Friday, October 7th
                      <p>6 PM - 9 PM: Check-in at Campus Center first floor, dinner at Blue Wall Cafe <br/>
                        9 PM - 10 PM: Opening ceremony in Campus Center Auditorium <br/>
                        10 PM: Move to Integrative Learning Center (ILC) <br/>
                        12 Midnight: Hacking begins in the ILC <br/>
                    </p>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Ad_commentThread onPost={(comment)=>this.handlePostComment(comment)}>
      {this.state.comments === undefined ? 0:this.state.comments.map((comment,i)=>{
        return (
          <Ad_comment key={i} data={comment} />
        )
      })}
    </Ad_commentThread>
  </div>
  )
}

}
