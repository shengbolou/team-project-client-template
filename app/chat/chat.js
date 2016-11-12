import React from 'react';
import Navbar from '../component/navbar';
import NavHeading from './navheading';
import NavBody from './navbody';
import {getUserData} from '../server';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getData() {
        getUserData(this.props.user, (userData) => {
            this.setState(userData);
        });
    }
    render() {
        return (
            <div>
                <Navbar chat="active" user={this.state}/>
                  <div className="container">
                      <div className="row">
                          <div className="col-md-4 col-sm-4 col-xs-4 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 chat-left">
                              <div className="panel panel-dafault">
                <NavHeading chat="active"/>
                <NavBody />
                </div>
                  </div>
                    </div>
                      </div>
            </div>
        );
    }

    componentDidMount() {
        this.getData();
    }
}
