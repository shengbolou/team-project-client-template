import React from 'react';
import {Link} from 'react-router';
import {hideElement} from '../util';

export default class PostEntry extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      text: "",
      img: null
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({text:e.target.value});
  }

  handlePost(e){
    e.preventDefault();
    var text = this.state.text.trim();
    if(text !== ""){
      this.props.onPost(text,this.state.img);
      this.setState(
        {
          text:"",
          img:null
        }
      );
    }
  }

  uploadImg(e){
    e.preventDefault();
    // Read the first file that the user selected (if the user selected multiple
    // files, we ignore the others).
    var reader = new FileReader();
    var file = e.target.files[0];
    // Called once the browser finishes loading the image.
    reader.onload = (upload) => {
      this.setState({
        img: upload.target.result
      });
    };

    // Tell the brower to read the image in as a data URL!
    reader.readAsDataURL(file);
  }

  render(){
    return(
      <div className="panel panel-default post-send">
        <div className="panel-heading">
          <div className="media">
            <div className="media-left">
              <Link to={"profile/"+this.props.userData._id}>
                <img className="media-object" src={this.props.userData.avatar} height="50px" alt="..."></img>
              </Link>
            </div>
            <div className="media-body">
              <textarea name="name" rows="8" cols="40" placeholder="What's on your mind"
                value={this.state.text} onChange={(e)=>this.handleChange(e)}></textarea>
              <div className="btn-group" role="group" aria-label="...">
                <label htmlFor="pic">
                  <a><i className="fa fa-camera" aria-hidden="true"></i></a>
                </label>
                <input type="file" accept=".jpg,.jpeg,.png,.gif" id="pic" onChange={(e)=>this.uploadImg(e)}></input>
              </div>
              <button type="button" className="btn btn-blue-grey pull-right" name="button" onClick={(e)=>this.handlePost(e)}>Submit</button>
            </div>
            <div className="media-footer">
              <img className={hideElement(this.state.img === null)} src={this.state.img} style={{width: "100%"}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
