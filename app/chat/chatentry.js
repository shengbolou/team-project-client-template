import React from 'react';


export default class ChatEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({text: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.text.trim() !== ""){
      this.setState({text:""});
      this.props.onPost(this.state.text);
    }
  }

  render(){
    return(
      <div className="panel-footer panel-footer-chatwindow" style={{
          'backgroundColor': 'white'
      }}>

          <div className="row panel-icons" style={{
              'paddingTop': '10px'
          }}>
              <div className="row container"></div>
          </div>

          <div className="row">
              <div className="col-md-10 col-xs-10 col-sm-10">
                  <textarea className="form-control msg nohover non-active" name="name" rows="3" value={this.state.text} onChange={(e)=>this.handleChange(e)} cols="40" placeholder="please type text"></textarea>

              </div>
              <div className="col-md-2 col-sm-2 col-xs-2 send">
                  <button type="button" className="btn btn-default btn-blue-grey pull-right" name="button" onClick={(e)=>this.handleSubmit(e)}>Send</button>
              </div>

          </div>
      </div>
    )
  }
}
