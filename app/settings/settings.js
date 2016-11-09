import React from 'react';
import Navbar from '../component/navbar';
import {getUserData} from '../server';
import {changeUserInfo} from '../server';
var alert = null;

export default class Settings extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userData: {},
      lastname: "",
      firstname: "",
      nickname: "",
      description: "",
      country: "",
      state: "",
      city: ""
    }
  }

  handleChangeUserInfo(e){
    e.preventDefault();

    changeUserInfo(this.props.user,
      this.state.lastname,
      this.state.firstname,
      this.state.discription,
      this.state.country,
      this.state.state,
      this.state.city,
      (userData)=>{
        this.setState({userData: userData});
      });

      this.setState(
        {
          lastname: "",
          firstname: "",
          nickname: "",
          description: "",
          country: "",
          state: "",
          city: ""
        }
      );

      alert = (<div className="alert alert-success alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;
                      </span>
                    </button>
                    <strong>Change info succeed!</strong> Please refresh page
                  </div>);

  }

  getData(){
    getUserData(this.props.user,(userData)=>{
        this.setState({userData:userData});
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

  handleState(e){
    e.preventDefault();
    this.setState({state: e.target.value});
  }

  handleCountry(e){
    e.preventDefault();
    this.setState({country: e.target.value});
  }

  handleCity(e){
    e.preventDefault();
    this.setState({city: e.target.value});
  }



  render(){
    return(
      <div>
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
                              <input type="text" id="" className="form-control"
                                value={this.state.lastname}
                                onChange={(e)=>this.handleLastname(e)}/>
                              <label htmlFor="form1" className="">LastName</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">
                              <input type="text" id="" className="form-control"
                                value={this.state.firstname}
                                onChange={(e)=>this.handleFirstname(e)}/>
                              <label htmlFor="form1" className="">FirstName</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                              <input type="text" id="" className="form-control"
                                value={this.state.nickname}
                                onChange={(e)=>this.handleNickname(e)}/>
                              <label htmlFor="form1" className="">NickName</label>
                          </div>
                          <div className="md-form">
                              <textarea type="text" className="md-textarea"
                                value={this.state.description}
                                onChange={(e)=>this.handleDescription(e)}></textarea>
                              <label htmlFor="form7">About you</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h4>Location</h4>
                      <div className="md-form" style={{"marginTop":'20'}}>
                          <input type="text" id="" className="form-control"
                            value={this.state.country}
                            onChange={(e)=>this.handleCountry(e)}/>
                          <label htmlFor="form1" className="">Country</label>
                      </div>
                      <div className="md-form">
                          <input type="text" id="" className="form-control"
                            value={this.state.state}
                            onChange={(e)=>this.handleState(e)}/>
                          <label htmlFor="form1" className="">State</label>
                      </div>
                      <div className="md-form">
                          <input type="text" id="" className="form-control"
                            value={this.state.city}
                            onChange={(e)=>this.handleCity(e)}/>
                          <label htmlFor="form1" className="">City</label>
                      </div>
                    </div>
                  </div>
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
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="email" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">Old Email</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="email" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">New Email</label>
                    </div>
                    <button type="button" className="btn btn-blue-grey pull-right" name="button">Submit</button>
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
