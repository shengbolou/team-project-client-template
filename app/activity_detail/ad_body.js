import React from 'React';
import Ad_comment from './ad_comment';
import Ad_commentThread from './ad_commentThread';
import Ad_participates_item from './ad_participates_item';
import Ad_signeduser from './Ad_signeduser'
import {getActivityDetail} from '../server';
import {adpostComment} from '../server';
import {likeActivity} from '../server';
import {unLikeActivity} from '../server';
import {Link} from 'react-router';
var moment = require('moment');

export default class Ad_body extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  didUserLike(user) {
    var likeCounter = this.state.likeCounter;
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === user)
        return true;
    }
    return false;
  }

  handleLikeClick(e){
    e.preventDefault();

    if(e.button === 0){
      var cb = (likeCounter) => {
        this.setState({likeCounter:likeCounter});
      };

      if(!this.didUserLike(this.props.currentUser)){
        likeActivity(this.state._id,this.props.currentUser,cb);
      }
      else{
        unLikeActivity(this.state._id,this.props.currentUser,cb);
      }
    }
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
    var text;
    var name;
    var authorid;
    switch(data.type){
      case "Event":
      case "Entertainment":
      case "Study":
        contents = data.contents;
        img = <img src={contents.img} width="100%" alt="" />;
        name = this.state.author.firstname + " "+this.state.author.lastname;
        authorid = this.state.author._id;
          text = contents.text.split("\n").map((line, i) => {
            return (
              <p key={"line" + i}>{line}</p>
            )                       ;
          })
        break;
      default:
        img = null;
        text = null;
        name = null;
    }

    return(
      <div className="activityDetail">
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
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
                      {this.state.location}<br />
                      <span className="glyphicon glyphicon-user"
                        style={{'paddingRight':'10px','paddingTop':'5px','paddingLeft': '15px'}}>
                      </span>
                      <Link to={"profile/"+authorid}>
                          {name}
                        </Link>
                    </div>

                    <div className = "col-md-4" style={{'paddingTop': '20px'}} >
                      <div className = "col-md-12 col-sm-12 col-xs-12 body-title-signed-in" align="left">
                        {this.state.participants === undefined ? 0:this.state.participants.length} people <font style={{'color':'grey'}}>signed up</font>

                      <font style={{'color':'#61B4E4','fontSize':'10px','paddingLeft':'10px','cursor':'pointer'}}
                        data-toggle="modal" data-target="#myModal"  >View All</font>



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
                    <a href="#" onClick={(e)=>this.handleLikeClick(e)}><span className="glyphicon glyphicon-heart" style={{'marginRight':'5px'}}></span>
                      {this.state.likeCounter === undefined ? 0:this.state.likeCounter.length}
                    </a>
                    <span className="glyphicon glyphicon-comment" style={{'marginRight':'5px','marginLeft':'20px'}}></span>
                    {this.state.comments === undefined ? 0:this.state.comments.length}
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
                      <br />

                      {text}


                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Ad_commentThread count={this.state.comments === undefined ? 0:this.state.comments.length} user={this.props.currentUser} avatar={this.props.avatar} onPost={(comment)=>this.handlePostComment(comment)}>
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
