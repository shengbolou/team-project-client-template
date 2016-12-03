import React from 'react';
import {searchquery} from '../server';
import {ActivityFeedItem} from '../activity/activityFeedItem';

export default class SearchEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      searchDataResult:[
        // {
        //   "_id": 2,
        //   "firstname": "Test",
        //   "lastname": "Account2",
        //   "nickname": "None",
        //   "avatar": "img/user.png",
        //   "description": "Hello everyone, I'm a test account",
        //   "location": {},
        //   "friends": [
        //     1
        //   ],
        //   "post": 2,
        //   "activity": 2,
        //   "notification": 2,
        //   "email": "test@umass.edu",
        //   "birthday": 1478129314000
        // },
        {
          "_id": 1,
          "type": "Event",
          "author": 1,
          "title": "Hack UMass",
          "img": "./img/HackUMass.jpg",
          "startTime": 1478129314000,
          "endTime": 1479940314000,
          "description": "Hack Umass",
          "location": "University of Massachusetts Amherst",
          "country": "USA",
          "state": "MA",
          "city": "Amherst",
          "participants": [
            1,
            2
          ],
          "likeCounter": [
            1,
            2,
            3
          ],
          "comments": [
            {
              "author": 1,
              "postDate": 1478129314000,
              "text": "iufihishf"
            }
          ],
          "contents": {
            "img": "./img/HackUMass-detail-1.png",
            "text": "Friday, October 7th\n6 PM - 9 PM: Check-in at Campus Center first floor, dinner at Blue Wall Cafe\n9 PM - 10 PM: Opening ceremony in Campus Center Auditorium\n 10 PM: Move to Integrative Learning Center (ILC) \n12 Midnight: Hacking begins in the ILC \n"
          }
        },
        {
          "_id":2,
          "type": "Party",
          "author":2,
          "title": "birthday party",
          "img":"img/Birthday-Party.jpg",
          "startTime": 1478129314000,
          "endTime": 1479940314000,
          "description": "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
          "location": "University of Massachusetts Amherst",
          "country": "USA",
          "state": "MA",
          "city": "Amherst",
          "participants": [],
          "likeCounter": [],
          "comments":[
            {
              "author": 1,
              "postDate": 1478129314000,
              "text": "iufihishf"
            }
          ],
          "contents": {
            "img": null,
            "text": "acticity detail of activity 2"
          }
        }
        // ,
        // {
        //   "_id": 1,
        //   "likeCounter": [],
        //   "type": "general",
        //   "contents": {
        //     "author": 1,
        //     "location": {},
        //     "postDate": 1478129314000,
        //     "text": "What's up there",
        //     "img": "img/tmp.jpg"
        //   },
        //   "comments": [
        //     {
        //       "author": 2,
        //       "text": "what's up",
        //       "postDate": 1478149440000
        //     },
        //     {
        //       "author": 3,
        //       "text": "Hello",
        //       "postDate": 1478149540000
        //     }
        //  ]
        // }
      ]
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      this.search();
    }
  }
  search() {
    var trimmedTerm = this.state.value.trim();
    if (trimmedTerm !== "") {
      searchquery(this.props.user,trimmedTerm,(searchData)=>
        this.setState({searchDataResult:searchData})
      )
    }
  }


  render(){
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="media">
              <div className="media-body">
                <form className="search-form" role="search">
                  <input type="text" className="form-control" placeholder="Welcome to We Meet, please search" onChange={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleKeyUp(e)}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
