var ObjectID = require('mongodb').ObjectID;

var databaseName = "Upao";
// Put the initial mock objects here.
var initialData = {
  //users
  "users":{
    "1":{
      "_id":new ObjectID("000000000000000000000001"),
      "firstname": "Vincent",
      "lastname": "Lou",
      "nickname": "crown",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a mock user",
      "location":{},
      "friends":[new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")],
      "post":new ObjectID("000000000000000000000001"),
      "activity":new ObjectID("000000000000000000000001"),
      "notification":new ObjectID("000000000000000000000001"),
      "email": "upao@umass.edu",
      "birthday":147812931,
      "sessions":[new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")]
    },
    "2": {
      "_id":new ObjectID("000000000000000000000002"),
      "firstname": "Test",
      "lastname": "Account2",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "location":{},
      "friends":[new ObjectID("000000000000000000000001")],
      "post":new ObjectID("000000000000000000000002"),
      "activity":new ObjectID("000000000000000000000002"),
      "notification":new ObjectID("000000000000000000000002"),
      "email": "test@umass.edu",
      "birthday":1478129314000,
      "sessions":[new ObjectID("000000000000000000000001")]
    },
    "3": {
      "_id":new ObjectID("000000000000000000000003"),
      "firstname": "Test",
      "lastname": "Account3",
      "nickname": "None",
      "avatar": "img/user.png",
      "description": "Hello everyone, I'm a test account",
      "location":{},
      "friends":[],
      "post":new ObjectID("000000000000000000000003"),
      "activity":new ObjectID("000000000000000000000003"),
      "notification":new ObjectID("000000000000000000000003"),
      "email": "test2@umass.edu",
      "birthday":1478129314000,
      "sessions":[new ObjectID("000000000000000000000002")]
    }
  },
  //notification collections
  "notifications": {
      "1": {
        "_id":new ObjectID("000000000000000000000001"),
        "contents":[new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")]
      },
      "2": {
        "_id":new ObjectID("000000000000000000000002"),
        "contents":[]
      },
      "3": {
        "_id":new ObjectID("000000000000000000000003"),
        "contents":[]
      }
  },
  "notificationItems": {
    "1": {
      "_id":new ObjectID("000000000000000000000001"),
      "sender":new ObjectID("000000000000000000000002"),
      "type": "FR"
    },
    "2": {
      "_id":new ObjectID("000000000000000000000002"),
      "author": new ObjectID("000000000000000000000002"),
      "type": "NF"
    }
  },
  //activity collection
  "activities": {
    "1": {
      "_id":new ObjectID("000000000000000000000001"),
      "contents": [new ObjectID("000000000000000000000001")]
    },
    "2": {
      "_id":new ObjectID("000000000000000000000002"),
      "contents": [new ObjectID("000000000000000000000002")]
    },
    "3": {
      "_id":new ObjectID("000000000000000000000003"),
      "contents":[new ObjectID("000000000000000000000003")]
    }
  },

  "activityItems":{
    "1": {
      "_id":new ObjectID("000000000000000000000001"),
      "type": "Event",
      "author":new ObjectID("000000000000000000000001"),
      "title": "Hack UMass",
      "img":"./img/HackUMass.jpg",
      "startTime": 1478129314000,
      "endTime": 1479940314000,
      "description": "Hack Umass",
      "location": "University of Massachusetts Amherst",
      "participants": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")],
      "likeCounter": [new ObjectID("000000000000000000000001"),
      new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")],
      "comments":[
        {
          "author":new ObjectID("000000000000000000000001"),
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
      "_id":new ObjectID("000000000000000000000002"),
      "type": "Party",
      "author":new ObjectID("000000000000000000000002"),
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
          "author":new ObjectID("000000000000000000000001"),
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
      "_id":new ObjectID("000000000000000000000003"),
      "type": "Party",
      "author":new ObjectID("000000000000000000000003"),
      "title": "dance party",
      "img":"img/parties.jpg",
      "startTime": 1478129314000,
      "endTime": 1479940314000,
      "description": "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      "location": "University of Massachusetts Amherst",
      "participants": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")],
      "likeCounter": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),
      new ObjectID("000000000000000000000003")],
      "comments":[
        {
          "author":new ObjectID("000000000000000000000001"),
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
      "_id":new ObjectID("000000000000000000000003"),
      "contents":[]
    },
    "2": {
      "_id":new ObjectID("000000000000000000000002"),
      "contents": []
    },
    "1": {
      "_id":new ObjectID("000000000000000000000001"),
      "contents": [new ObjectID("000000000000000000000001")]
    }
  },

  //post feed items
  "postFeedItems": {
    "1": {
      "_id":new ObjectID("000000000000000000000001"),
      "likeCounter":[],
      "type": "general",
      "contents": {
        "author":new ObjectID("000000000000000000000001"),
        "location":{},
        //unix time
        "postDate": 1478129314000,
        "text": "What's up there",
        "img": "img/tmp.jpg"
      },
      "comments": [
        {
          "author":new ObjectID("000000000000000000000002"),
          "text": "what's up",
          "postDate": 1478149440000
        },
        {
          "author":new ObjectID("000000000000000000000003"),
          "text": "Hello",
          "postDate": 1478149540000
        }
      ]
    }
  },

  // "messagesession" collection.
    "messageSession": {
      "1": {
        "_id":new ObjectID("000000000000000000000001"),
        "users": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")],
        "contents": [new ObjectID("000000000000000000000001")],
        "lastmessage":"cool"
      },
      "2": {
        "_id":new ObjectID("000000000000000000000002"),
        "users": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000003")],
        "contents": [new ObjectID("000000000000000000000002")],
        "lastmessage":"Good night!"
      }
    },
    //message table
    "message": {
      "1": {
        "_id":new ObjectID("000000000000000000000001"),
        "messages": [
          {
            "sender":new ObjectID("000000000000000000000001"),
            "target":new ObjectID("000000000000000000000002"),
            "date" : 1478149540000,
            "text": "what's up"
          },
          {
            "sender":new ObjectID("000000000000000000000002"),
            "target":new ObjectID("000000000000000000000001"),
            "date" : 1478149540000,
            "text": `
  Mr Trump tweeted that the process of selecting his new cabinet and other positions was "very organised".`

          },
          {
            "sender":new ObjectID("000000000000000000000001"),
            "target":new ObjectID("000000000000000000000002"),
            "date" : 1478149540000,
            "text": "cool"
          }
        ]
      },
      "2": {
          "_id":new ObjectID("000000000000000000000002"),
          "messages": [
            {
              "sender":new ObjectID("000000000000000000000001"),
              "target":new ObjectID("000000000000000000000003"),
              "date" : 1478149540000,
              "text": "yo"
            },
            {
              "sender":new ObjectID("000000000000000000000003"),
              "target":new ObjectID("000000000000000000000001"),
              "date" : 1478149540000,
              "text": `Good Night!.`

            },
            {
              "sender":new ObjectID("000000000000000000000001"),
              "target":new ObjectID("000000000000000000000003"),
              "date" : 1478149540000,
              "text": "Good night!"
            }
          ]
        }

    }

  };
/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Adds any desired indexes to the database.
 */
function addIndexes(db, cb) {
  db.collection('postFeedItems').createIndex({ "contents.text": "text" });
  db.collection('activityItems').createIndex({ description: "text" });
  db.collection('users').createIndex({ lastname: "text",
  firstname: "text"},null,cb);
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
