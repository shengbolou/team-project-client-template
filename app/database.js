import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "Upao";

// Put your mock objects here, as in Workshop 4
var initialData = {
  //users
  "users":{
    "1":{
      "_id":1,
      "firstname": "Vincent",
      "lastname": "Lou",
      "nickname": "crown",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a mock user",
      "country": "USA",
      "state": "MA",
      "city": "Amherst",
      "friends":[2,3],
      "post":1,
      "activity":1,
      "notification":1,
      "email": "upao@umass.edu",
      "dob_month": 5,
      "dob_day": 21,
      "dob_year": 1995
    },
    "2": {
      "_id":2,
      "firstname": "Test",
      "lastname": "Account2",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "country": "USA",
      "state": "MA",
      "city": "Amherst",
      "friends":[1],
      "post":2,
      "activity":2,
      "notification":2,
      "email": "test@umass.edu",
      "dob_month": 11,
      "dob_day": 11,
      "dob_year": 2016
    },
    "3": {
      "_id":3,
      "firstname": "Test",
      "lastname": "Account3",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "country": "USA",
      "state": "MA",
      "city": "Amherst",
      "friends":[],
      "post":3,
      "activity":3,
      "notification":3,
      "email": "test2@umass.edu",
      "dob_month": 11,
      "dob_day": 11,
      "dob_year": 2016
    }
  },
  //notification collections
  "notifications": {
      "1": {
        "_id":1,
        "contents":[1,2]
      },
      "2": {
        "_id":2,
        "contents":[]
      },
      "3": {
        "_id":3,
        "contents":[]
      }
  },
  "notificationItems": {
    "1": {
      "_id":1,
      "sender":2,
      "type": "FR"
    },
    "2": {
      "_id":2,
      "author": 2,
      "type": "NF"
    }
  },
  //activity collection
  "activities": {
    "1": {
      "_id":1,
      "contents": [1]
    },
    "2": {
      "_id":2,
      "contents": [2]
    },
    "3": {
      "_id":3,
      "contents":[3]
    }
  },

  "activityItems":{
    "1": {
      "_id":1,
      "type": "Event",
      "author":1,
      "title": "Hack UMass",
      "img":"./img/HackUMass.jpg",
      "startTime": 1478129314000,
      "endTime": 1479940314000,
      "description": "Hack Umass",
      "location": "University of Massachusetts Amherst",
      "country": "USA",
      "state": "MA",
      "city": "Amherst",
      "participants": [1,2],
      "likeCounter": [1,2,3],
      "comments":[
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
    "2": {
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
    },
    "3": {
      "_id":3,
      "type": "Party",
      "author":1,
      "title": "dance party",
      "img":"img/parties.jpg",
      "startTime": 1478129314000,
      "endTime": 1479940314000,
      "description": "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      "location": "University of Massachusetts Amherst",
      "country": "USA",
      "state": "MA",
      "city": "Amherst",
      "participants": [2,3],
      "likeCounter": [1,2,3],
      "comments":[
        {
          "author": 1,
          "postDate": 1478129314000,
          "text": "iufihishf"
        }
      ],
      "contents": {
        "img": null,
        "text": "activity detail of activity 3"
      }
    }


  },

  // "feeds" collection. Feeds for each user.
  "postFeeds": {
    "2": {
      "_id": 2,
      "contents": []
    },
    "1": {
      "_id": 1,
      "contents": [1]
    }
  },

  //post feed items
  "postFeedItems": {
    "1": {
      "_id":1,
      "likeCounter":[],
      "type": "general",
      "contents": {
        "author": 1,
        //unix time
        "postDate": 1478129314000,
        "text": "What's up there",
        "img": "img/tmp.jpg"
      },
      "comments": [
        {
          "author": 2,
          "text": "what's up",
          "postDate": 1478149440000
        },
        {
          "author": 3,
          "text": "Hello",
          "postDate": 1478149540000
        }
      ]
    }
  },

  // "feeds" collection. Feeds for each user.
  "messageSession": {
    "1": {
      "_id": 1,
      "contents": [1]
    }
  },
  //message table
  "message": {
    "1": {
      "_id":1,
      "messages": [
        {
          "sender" : 1,
          "target" : 2,
          "date" : 1478149540000,
          "text": "what's up"
        },
        {
          "sender" : 2,
          "target" : 1,
          "date" : 1478149540000,
          "text": `
Mr Trump tweeted that the process of selecting his new cabinet and other positions was "very organised".
US media say two senior members of the transition team working on national security have been forced out.
Mr Trump, a property tycoon and Republican outsider, won an unexpected victory against Hillary Clinton.
Outgoing President Barack Obama, on a visit to Greece, admitted he and his successor "could not be more different" but vowed to "do everything we can to support the smoothest transition possible," saying democracy depended on it.
Inside the secret Clinton Facebook group
Twitter suspends alt-right figureheads
The people around Donald Trump
Five bumpy White House transitions
Mr Trump has already replaced New Jersey Governor Chris Christie with Vice-President-elect Mike Pence as head of his transition team.
Media reports say Mr Trump's son-in-law and close adviser Jared Kushner was behind the change.
Mr Christie was New Jersey attorney general when Mr Kushner's father was tried and jailed in the state for tax evasion, illegal campaign contributions and witness tampering in 2004."`
        },
        {
          "sender" : 1,
          "target" : 2,
          "date" : 1478149540000,
          "text": "what's up"
        }
      ]
    }
  }

};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

export function deleteDocument(collection,id){
  delete data[collection][id];
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
