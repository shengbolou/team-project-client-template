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
      "firstname": "John",
      "lastname": "norlan",
      "nickname": "crown",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a mock user",
      "country": "US",
      "state": "MA",
      "city": "Amherst",
      "post":1,
      "activity":1
    },
    "2": {
      "_id":2,
      "firstname": "Test",
      "lastname": "Account",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "country": "US",
      "state": "MA",
      "city": "Amherst",
      "post":2,
      "activity":2
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
        "postDate": 1478093425,
        "text": "What's up there",
        "img": null
      },
      "comments": [
        {
          "author": 2,
          "text": "what's up",
          "postDate": 1478094635
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
// class ResetDatabase extends React.Component {
//   render() {
//     return (
//       <button className="btn btn-default" type="button" onClick={() => {
//         resetDatabase();
//         window.alert("Database reset! Refreshing the page now...");
//         document.location.reload(false);
//       }}>Reset Mock DB</button>
//     );
//   }
// }

// ReactDOM.render(
//   <ResetDatabase />,
//   document.getElementById('db-reset')
// );
