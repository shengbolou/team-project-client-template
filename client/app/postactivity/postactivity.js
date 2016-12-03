import React from 'react';
import Navbar from '../component/navbar';
import {getUserData,createActivity} from '../server';
import FriendItem from './friendItem';
import {hashHistory} from 'react-router';
// var debug = require('react-debug');

export default class PostActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData: {},
      type:"",
      title: "",
      img:null,
      startTime: '',
      endTime: '',
      description: "",
      location: "",
      detail:""
    }
  }

  getData(){
    getUserData(this.props.user,(userData)=>{
      this.setState({
        userData: userData
      })
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.type!=="------Select a Activity Type-----"&&
        this.state.title.trim()!=="" &&
        this.state.startTime.trim()!=="" &&
        this.state.endTime.trim()!==""&&
        this.state.description.trim()!==""&&
        this.state.location.trim()!==""&&
        this.state.detail.trim()!==""
    ){
      createActivity(this.state,()=>{
        hashHistory.push('/');
      });
    }
  }

  componentDidMount(){
    this.getData();
  }

  handleTitle(e){
    e.preventDefault();
    this.setState({
      title: e.target.value
    })
  }

  handleStartTime(e){
    e.preventDefault();
    this.setState({
      startTime: e.target.value
    })
  }

  handleEndTime(e){
    e.preventDefault();
    this.setState({
      endTime: e.target.value
    })
  }

  handleLocation(e){
    e.preventDefault();
    this.setState({
      location: e.target.value
    })
  }
  handleDetail(e){
    e.preventDefault();
    this.setState({
      detail: e.target.value
    })
  }

  handleEvent(e){
    e.preventDefault();
    this.setState({
      type: e.target.value
    })
  }
  handleDescription(e){
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  }


  render() {
    return (
      <div className='postactivity'>
        <Navbar user={this.state.userData}/>
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-2">
              <h4><span style={{
                  "marginRight":'10'
                }}><i className="glyphicon glyphicon-list-alt" aria-hidden="true"></i></span>Create Activity</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-md-offset-2 infos">
              <div className="panel panel-default personal-info-1">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-md-12">
                      <h4>Activity Info</h4>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                            <input type="text" id="" className="form-control"
                              value={this.state.title}
                              onChange={(e)=>this.handleTitle(e)}/>
                            <label htmlFor="form1" className="">Title</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form">
                            <h5>Start Time</h5>
                            <input type="datetime-local" id="" className="form-control"
                              value={this.state.startTime}
                              onChange={(e)=>this.handleStartTime(e)}
                              placeholder="this"/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">
                              <h5>End Time</h5>
                            <input type="datetime-local" id="" className="form-control"
                              value={this.state.endTime}
                              onChange={(e)=>this.handleEndTime(e)}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form">
                            <input type="text" id="" className="form-control"
                              value={this.state.location}
                              onChange={(e)=>this.handleLocation(e)}/>
                            <label htmlFor="form1" className="">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">
                            <select className="form-control select" value={this.state.type} onChange={(e)=>this.handleEvent(e)}>
                              <option>------Select a Activity Type-----</option>
                              <option>Event</option>
                              <option>Entertainment</option>
                              <option>Study</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                            <textarea type="text" id="" className="md-textarea"
                              value={this.state.description}
                              onChange={(e)=>this.handleDescription(e)}></textarea>
                            <label htmlFor="form7">Description</label>
                          </div>
                          <div className="md-form">
                            <textarea type="text" id="" className="md-textarea"
                              value={this.state.detail}
                              onChange={(e)=>this.handleDetail(e)}></textarea>
                            <label htmlFor="">Details</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-md-6 nopadding">
                        <button type="button" className="btn btn-blue-grey pull-Left nomargin" name="button" data-toggle="modal" data-target="#invitemodal">Invite Friend</button>
                        <div className="modal fade " id="invitemodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header" style={{
                                  "border":'none'
                                }}>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Invite friends</h4>
                                <hr />
                              </div>
                              <div className="modal-body " style={{
                                  "padding":'0'
                                }}>
                                <ul className="media-list">
                                  {this.state.userData.friends === undefined ? null : this.state.userData.friends.map((friend,i)=>{
                                    return <FriendItem data={friend} key={i}/>
                                  })}
                                </ul>
                          </div>

                          <div className="modal-footer" style={{
                              'border':'none'
                            }}>
                            <button type="button" className="btn btn-default btn-blue-grey" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-blue-grey">Confirm</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label type="button" className="btn btn-blue-grey pull-left" name="button">
                      Upload IMG <input type="file" style={{"display":"none"}}/></label>
                  </div>
                  <div className="col-md-6 nopadding">
                    <button type="button" className="btn btn-blue-grey pull-right nomargin" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
}
