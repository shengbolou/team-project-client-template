import React from 'react';
import Navbar from '../component/navbar';
import {getUserData,changeEmail,changeUserInfo,ChangeAvatar} from '../server';
var alert = null;
var emailAlert = null;
var moment = require('moment');
import AvatarCropper from "react-avatar-cropper";
import {hideElement} from '../util';


export default class Settings extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userData: {},
      lastname: "",
      firstname: "",
      nickname: "",
      description: "",
      birthday:"",
      oldEmail:"",
      newEmail:"",
      img: null,
      cropperOpen: false
    }
  }

  handleFile(e){
    e.preventDefault();
    // Read the first file that the user selected (if the user selected multiple
    // files, we ignore the others).
    var reader = new FileReader();
    var file = e.target.files[0];
    // Called once the browser finishes loading the image.
    reader.onload = (upload) => {
      this.setState({
        img: upload.target.result,
        cropperOpen:true
      });
    };

    reader.readAsDataURL(file);
  }

  handleFileClick(e){
    e.target.value = null;
  }

  handleRequestHide(e){
    e.preventDefault();
    this.setState({
      cropperOpen: false
    })
  }

  handleCrop(dataURI) {
    this.setState({
      cropperOpen: false,
      img: dataURI
    });
  }

  handleAvatarChange(e){
    e.preventDefault();
    if(this.state.img !== null){
      ChangeAvatar(this.state.userData._id,this.state.img,(userData)=>{
        this.setState({userData: userData});
      });
    }
  }

  handleChangeUserInfo(e){
    e.preventDefault();
    if(this.state.lastname!==""&&
        this.state.firstname!=""&&
        this.state.nickname!==""&&
        this.state.description!==""){
          changeUserInfo({
            userId: this.state.userData._id,
            lastname: this.state.lastname,
            firstname:  this.state.firstname,
            nickname: this.state.nickname,
            description: this.state.description,
            birthday:this.state.birthday
          },(userData)=>{
            alert = (<div className="alert alert-success alert-dismissible" role="alert">
                          <strong>Change info succeed!</strong>
                        </div>);
          this.setState({userData: userData});
          });
        }
        else{
          alert = (<div className="alert alert-warning alert-dismissible" role="alert">
                        <strong>Please fill in blanks</strong>
                      </div>);
        }

  }

  getData(){
    getUserData(this.props.user,(userData)=>{
        this.setState({
          userData:userData,
          lastname: userData.lastname,
          firstname: userData.firstname,
          nickname: userData.nickname,
          description: userData.description,
          birthday: moment(userData.birthday).format('YYYY-MM-DD')
        });
    });
  }

  handleLastname(e){
    e.preventDefault();
    this.setState({lastname: e.target.value});
  }

  handleFirstname(e){
    e.preventDefault();
    this.setState({firstname: e.target.value});
  }

  handleNickname(e){
    e.preventDefault();
    this.setState({nickname: e.target.value});
  }

  handleDescription(e){
    e.preventDefault();
    this.setState({description: e.target.value});
  }
  handleBirthday(e){
    e.preventDefault();
    this.setState({birthday: e.target.value});
  }
  handleOldEmail(e){
    e.preventDefault();
    this.setState({oldEmail: e.target.value});
  }
  handleNewEmail(e){
    e.preventDefault();
    this.setState({newEmail: e.target.value});
  }
  handleEmailChange(e){
      e.preventDefault();
      if(this.state.oldEmail!=="" && this.state.newEmail!==""){
        changeEmail({
          userId: this.state.userData._id,
          oldEmail: this.state.oldEmail,
          newEmail: this.state.newEmail
        },(error)=>{
          if(error){
            emailAlert = (<div className="alert alert-warning" role="alert">
                          <strong>Old email is wrong or new email has wrong format</strong>
                        </div>);
          }
          else{
            emailAlert = (<div className="alert alert-success" role="alert">
                          <strong>Change email succeed!</strong>
                        </div>);
          }
          this.setState({
            oldEmail:"",
            newEmail:""
          })
        });
      }
      else{
        emailAlert = (<div className="alert alert-warning" role="alert">
                      <strong>fill in blanks</strong>
                    </div>);
      }

      this.setState({
        oldEmail:"",
        newEmail:""
      })
  }


  render(){
    return(
      <div>
        {this.state.cropperOpen &&
          <AvatarCropper
            onRequestHide={(e)=>this.handleRequestHide(e)}
            cropperOpen={this.state.cropperOpen}
            onCrop={(e)=>this.handleCrop(e)}
            image={this.state.img}
            width={400}
            height={350}
            />
        }
        <Navbar user={this.state.userData}/>
        <div className="container settings">
          <div className="row">
            <div className="col-md-7 col-md-offset-1 infos">
              <h4><span><i className="fa fa-cog" aria-hidden="true"></i></span> Settings</h4>
              <div className="panel panel-default personal-info-1">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-md-12">
                      <h4>Personal Info</h4>
                      <div>
                        {alert}
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form">
                              <input type="text" className="form-control"
                                value={this.state.lastname}
                                onChange={(e)=>this.handleLastname(e)}/>
                              <label className="shown">LastName</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">
                              <input type="text" id="" className="form-control"
                                value={this.state.firstname}
                                onChange={(e)=>this.handleFirstname(e)}/>
                              <label className="shown">FirstName</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                              <input type="text" id="" className="form-control"
                                value={this.state.nickname}
                                onChange={(e)=>this.handleNickname(e)}/>
                              <label className="shown">NickName</label>
                          </div>
                          <div className="md-form">
                            <h5>Birthday</h5>
                            <input type="date" id="" className="form-control"
                              value={this.state.birthday}
                              onChange={(e)=>this.handleBirthday(e)}
                              placeholder="this"/>
                          </div>
                          <div className="md-form">
                              <textarea type="text" className="md-textarea"
                                value={this.state.description}
                                onChange={(e)=>this.handleDescription(e)}></textarea>
                              <label className="shown">About you</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                </div>
                <div className="panel-footer">
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-blue-grey pull-right" name="button"
                        onClick={(e)=>this.handleChangeUserInfo(e)}>Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 system-settings">
              <div className="list-group">
                <a className="list-group-item"data-toggle="collapse" data-parent="#accordion" href="#reset-password" aria-expanded="true" aria-controls="reset-password">
                  Reset Password <span className="pull-right"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                </a>
                <div id="reset-password" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <div className="panel-body">
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="password" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">Old password</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="password" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">New password</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="password" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">Repeat password</label>
                    </div>
                    <button type="button" className="btn btn-blue-grey pull-right" name="button">Submit</button>
                  </div>
                </div>
                <a className="list-group-item"data-toggle="collapse" data-parent="#accordion" href="#reset-email" aria-expanded="true" aria-controls="reset-password">
                  Reset Email <span className="pull-right"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                </a>
                <div id="reset-email" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <div className="panel-body">
                    {emailAlert}
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="email" id="" value={this.state.oldEmail}className="form-control" onChange={(e)=>this.handleOldEmail(e)}/>
                        <label htmlFor="Form1" className="">Old Email</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="email" id="" value={this.state.newEmail} className="form-control" onChange={(e)=>this.handleNewEmail(e)}/>
                        <label htmlFor="Form1" className="">New Email</label>
                    </div>
                    <button type="button" className="btn btn-blue-grey pull-right" name="button" onClick={(e)=>this.handleEmailChange(e)}>Submit</button>
                  </div>
                </div>

                <a className="list-group-item"data-toggle="collapse" data-parent="#accordion" href="#change-avatar" aria-expanded="true" aria-controls="reset-password">
                  Change Avatar <span className="pull-right"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                </a>

                <div id="change-avatar" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-8 col-md-offset-3">
                        <div className="btn-group" role="group">
                          <label htmlFor="pic">
                            <a>
                              <div className="thumbnail" style={{
                                  border: "1px dashed black",
                                  width: "100px",
                                  height: "110px"
                                }}>
                                <i className="fa fa-camera" aria-hidden="true"></i>
                                <img src={this.state.img} className={hideElement(this.state.cropperOpen)}
                                  width="100px" height="100px"/>
                              </div>
                            </a>
                          </label>
                          <input type="file" accept=".jpg,.jpeg,.png,.gif" id="pic" onClick={(e)=>this.handleFileClick(e)}
                            onChange={(e)=>this.handleFile(e)}></input>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="btn btn-blue-grey pull-right" name="button"
                      onClick={(e)=>this.handleAvatarChange(e)}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.getData();
  }
}
