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
      "location":{},
      "friends":[3],
      "post":1,
      "activity":1,
      "notification":1,
      "email": "upao@umass.edu",
      "birthday":147812931,
      "sessions":[1,2]
    },
    "2": {
      "_id":2,
      "firstname": "Test",
      "lastname": "Account2",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "location":{},
      "friends":[1],
      "post":2,
      "activity":2,
      "notification":2,
      "email": "test@umass.edu",
      "birthday":1478129314000,
      "sessions":[1]
    },
    "3": {
      "_id":3,
      "firstname": "Test",
      "lastname": "Account3",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "location":{},
      "friends":[],
      "post":3,
      "activity":3,
      "notification":3,
      "email": "test2@umass.edu",
      "birthday":1478129314000,
      "sessions":[2]
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
    "3": {
      "_id":3,
      "contents":[]
    },
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
        "location":{},
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

  // "messagesession" collection.
    "messageSession": {
      "1": {
        "_id": 1,
        "users": [1,2],
        "contents": [1],
        "lastmessage":"cool"
      },
      "2": {
        "_id": 2,
        "users": [1,3],
        "contents": [2],
        "lastmessage":"Good night!"
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
  Mr Trump tweeted that the process of selecting his new cabinet and other positions was "very organised".`

          },
          {
            "sender" : 1,
            "target" : 2,
            "date" : 1478149540000,
            "text": "cool"
          }
        ]
      },
      "2": {
          "_id":2,
          "messages": [
            {
              "sender" : 1,
              "target" : 3,
              "date" : 1478149540000,
              "text": "yo"
            },
            {
              "sender" : 3,
              "target" : 1,
              "date" : 1478149540000,
              "text": `Good Night!.`

            },
            {
              "sender" : 1,
              "target" : 3,
              "date" : 1478149540000,
              "text": "Good night!"
            }
          ]
        }

    }

  };

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
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
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
