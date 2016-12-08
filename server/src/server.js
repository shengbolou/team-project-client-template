// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
// Support receiving JSON in HTTP request bodies
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/Upao';
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));


MongoClient.connect(url, function(err, db) {
  // var moment = require('moment');
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(express.static('../client/build'));
  app.use('/mongo_express', mongo_express(mongo_express_config));
  if(err)
  console.log(err);
  else{
    console.log("connected to database")
  }

  //import database functions
  var database = require('./database.js');
  var readDocument = database.readDocument;
  var addDocument = database.addDocument;
  var writeDocument = database.writeDocument;
  var getCollection = database.getCollection;

  //schemas
  var statusUpdateSchema = require('./schemas/statusUpdate.json');
  var commentSchema = require('./schemas/comment.json');
  var userInfoSchema = require('./schemas/userInfo.json');
  var emailChangeSchema = require('./schemas/emailChange.json');
  var activitySchema = require('./schemas/activity.json');
  var validate = require('express-jsonschema').validate;

  //get post feed data
  function getPostFeedItem(feedItemId,callback){
    db.collection('postFeedItems').findOne({_id:feedItemId},function(err,postFeedItem){
      if(err)
      callback(err);
      else if(postFeedItem===null){
        callback(null,null);
      }
      else{
        var userList = [postFeedItem.contents.author];
        postFeedItem.comments.forEach((comment)=>{
          userList.push(comment.author);
        });
        userList = userList.concat(postFeedItem.likeCounter);

        resolveUserObjects(userList,function(err,userMap){
          if(err)
          callback(err);
          else{
            postFeedItem.likeCounter = postFeedItem.likeCounter.map((id)=>userMap[id]);
            postFeedItem.contents.author =userMap[postFeedItem.contents.author];
            postFeedItem.comments.forEach((comment)=>{
              comment.author = userMap[comment.author];
            });
            callback(null,postFeedItem);
          }
        });
      }
    });
  }

  function getPostFeedData(user, callback) {
    db.collection('users').findOne({
      _id: user
    }, function(err, userData) {
      if (err) {
        return callback(err);
      } else if (userData === null) {
        // User not found.
        return callback(null, null);
      }

      db.collection('postFeeds').findOne({
        _id: userData.post
      }, function(err, feedData) {
        if (err) {
          return callback(err);
        } else if (feedData === null) {
          // Feed not found.
          return callback(null, null);
        }

        // We will place all of the resolved FeedItems here.
        // When done, we will put them into the Feed object
        // and send the Feed to the client.
        var resolvedContents = [];

        // processNextFeedItem is like an asynchronous for loop:
        // It performs processing on one feed item, and then triggers
        // processing the next item once the first one completes.
        // When all of the feed items are processed, it completes
        // a final action: Sending the response to the client.
        function processNextFeedItem(i) {
          // Asynchronously resolve a feed item.
          getPostFeedItem(feedData.contents[i], function(err, feedItem) {
            if (err) {
              // Pass an error to the callback.
              callback(err);
            } else {
              // Success!
              resolvedContents.push(feedItem);
              if (resolvedContents.length === feedData.contents.length) {
                // I am the final feed item; all others are resolved.
                // Pass the resolved feed document back to the callback.
                feedData.contents = resolvedContents;
                callback(null, feedData);
              } else {
                // Process the next feed item.
                processNextFeedItem(i + 1);
              }
            }
          });
        }

        // Special case: Feed is empty.
        if (feedData.contents.length === 0) {
          callback(null, feedData);
        } else {
          processNextFeedItem(0);
        }
      });
    });
  }

  // function getPostFeedData(user){
  //   var userData = readDocument('users',user);
  //   var feedData = readDocument('postFeeds',userData.post);
  //   feedData.contents = feedData.contents.map(getPostFeedItemSync);
  //   return feedData;
  // }

  app.get('/user/:userId/feed',function(req,res){
    var userId = req.params.userId;
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if(userId === fromUser){
    getPostFeedData(new ObjectID(userId),function(err,feedData){
      if(err)
      sendDatabaseError(res,err);
      else if(feedData === null){
        res.status(400);
        res.send("Could not look up feed for user " + userId);
      }
      else{
        res.send(feedData);
      }
    });
    // }
    // else{
    // res.status(401).end();
    // }
  });

  function postStatus(user, text, location, img, callback){
    var time = new Date().getTime();

    var post = {
      "likeCounter":[],
      "type": "general",
      "contents": {
        "author": user,
        "postDate": time,
        "text": text,
        "img": img,
        "location": location
      },
      "comments":[]
    };
    db.collection('postFeedItems').insertOne(post,function(err,result){
      if(err)
      callback(err);
      else{
        post._id = result.insertedId;
        db.collection("users").findOne({_id:user},function(err,userData){
          if(err)
          callback(err);
          else{
            db.collection('postFeeds').updateOne({_id:userData.post},
              {
                $push:{
                  contents:{
                    $each:[post._id],
                    $position:0
                  }
                }
              },function(err){
                if(err)
                callback(err);
                else{
                  callback(null,post);
                }
              });
            }
          });
        }
      });
    }
    //create post
    app.post('/postItem', validate({ body: statusUpdateSchema }),function(req,res){
      var body = req.body;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if(fromUser === body.userId){
        postStatus(new ObjectID(body.userId),body.text,body.location, body.img,function(err,newPost){
          if(err)
          sendDatabaseError(res,err);
          else{
            res.status(201);
            res.send(newPost);
          }
        });
      }
      else{
        res.status(401).end();
      }
    });


    //like post
    app.put('/postItem/:postItemId/likelist/:userId',function(req,res){
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var postItemId = req.params.postItemId;
      var userId = req.params.userId;

      if(userId === fromUser){
        db.collection('postFeedItems').updateOne({_id:new ObjectID(postItemId)},{
          $addToSet:{
            likeCounter: new ObjectID(userId)
          }
        },function(err){
          if(err)
          sendDatabaseError(res,err);
          else{
            getPostFeedItem(new ObjectID(postItemId),function(err,postItem){
              if(err)
              sendDatabaseError(res,err);
              else{
                res.send(postItem.likeCounter);
              }
            }
          )
        }
      });
    }
    else{
      res.status(401).end();
    }
  });

  //unlike post
  app.delete('/postItem/:postItemId/likelist/:userId',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var postItemId = req.params.postItemId;
    var userId = req.params.userId;
    if(userId === fromUser){
      db.collection("postFeedItems").updateOne({_id:new ObjectID(postItemId)},{
        $pull:{
          likeCounter: new ObjectID(userId)
        }
      },function(err){
        if(err)
        sendDatabaseError(res,err);
        else{
          getPostFeedItem(new ObjectID(postItemId),function(err,postItem){
            if(err)
            sendDatabaseError(res,err);
            else{
              res.send(postItem.likeCounter);
            }
          }
        )
      }
    });
  }
  else{
    res.status(401).end();
  }
});

function resolveUserObjects(userList, callback) {
  // Special case: userList is empty.
  // It would be invalid to query the database with a logical OR
  // query with an empty array.
  if (userList.length === 0) {
    callback(null, {});
  } else {
    // Build up a MongoDB "OR" query to resolve all of the user objects
    // in the userList.
    var query = {
      $or: userList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('users').find(query).toArray(function(err, users) {
      if (err) {
        return callback(err);
      }
      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      callback(null, userMap);
    });
  }
}

function resolveSessionObject(sessionList, callback){
  if (sessionList.length === 0) {
    callback(null, {});
  } else {
    var query = {
      $or: sessionList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('messageSession').find(query).toArray(function(err, sessions) {
      if (err) {
        return callback(err);
      }
      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var sessionMap = {};
      sessions.forEach((session) => {
        sessionMap[session._id] = session;
      });
      callback(null, sessionMap);
    });
  }
}

/**
* Helper function: Sends back HTTP response with error code 500 due to
* a database error.
*/
function sendDatabaseError(res, err) {
  res.status(500).send("A database error occurred: " + err);
}

function getUserData(userId,callback){
  db.collection('users').findOne({_id:userId},function(err,userData){
    if(err)
    callback(err);
    else{
      resolveUserObjects(userData.friends,function(err,userMap){
        if(err)
        callback(err);
        else{
          userData.friends = userData.friends.map((id)=>userMap[id]);
          resolveSessionObject(userData.sessions,function(err,sessionMap){
            if(err)
            callback(err);
            else{
              userData.sessions = userData.sessions.map((id)=>sessionMap[id]);
              callback(null,userData);
            }
          });
        }
      });
    }
  });
}

//get user data
app.get('/user/:userId',function(req,res){
  var userId = req.params.userId;
  getUserData(new ObjectID(userId),function(err,userData){
    if(err)
    return sendDatabaseError(res,err);
    res.send(userData);
  });
});

//post comments
app.post('/postItem/:postItemId/commentThread/comment',validate({body:commentSchema}),
function(req,res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var body = req.body;
  var postItemId = req.params.postItemId;
  var userId = body.author;
  if(fromUser === userId){
    db.collection('postFeedItems').updateOne({_id:new ObjectID(postItemId)},{
      $push:{
        comments:{
          "author": new ObjectID(userId),
          "text": body.text,
          "postDate": (new Date()).getTime()
        }
      }
    },function(err){
      if(err)
      sendDatabaseError(res.err);
      else{
        getPostFeedItem(new ObjectID(postItemId),function(err,postItem){
          if(err)
          sendDatabaseError(res,err);
          else {
            res.send(postItem);
          }
        });
      }
    });
  }
  else{
    res.status(401).end();
  }
});

//change user info
app.put('/settings/user/:userId',validate({body:userInfoSchema}),function(req,res){
  var data = req.body;
  var moment = require('moment');
  var userId = new ObjectID(req.params.userId);
  var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
  if(fromUser.str === userId.str){
    db.collection('users').updateOne({_id:userId},{
      $set:{
        lastname:data.lastname,
        firstname:data.firstname,
        nickname:data.nickname,
        description:data.description,
        location:data.location,
        birthday:moment(data.birthday).valueOf()
      }
    },function(err){
      if(err)
      return sendDatabaseError(res,err);
      getUserData(userId,function(err,userData){
        if(err)
        return sendDatabaseError(res,err);
        res.send(userData);
      });
    });
  }
  else{
    res.status(401).end();
  }
});

function getActivityFeedItem(activityId,callback){
  db.collection('activityItems').findOne({_id:activityId},function(err,activityItem){
    if(err)
    return callback(err);

    var userList = [activityItem.author];
    activityItem.comments.forEach((comment)=>{
      userList.push(comment.author);
    });
    activityItem.likeCounter.map((id)=>userList.push(id));
    activityItem.participants.map((id)=>userList.push(id));
    resolveUserObjects(userList,function(err,userMap){
      if(err)
      return callback(err);

      activityItem.author = userMap[activityItem.author];
      activityItem.participants = activityItem.participants.map((id) => userMap[id]);
      activityItem.likeCounter = activityItem.likeCounter.map((id) => userMap[id]);
      activityItem.comments.forEach((comment) => {
        comment.author = userMap[comment.author];
      });

      callback(null,activityItem);
    });

  });
}


function getActivityFeedData(userId, callback){
  db.collection('users').findOne({_id:userId},function(err,userData){
    if(err)
    return callback(err);
    else if(userData === null)
    return callback(null,null);
    else{
      db.collection('activities').findOne({_id:userData.activity},function(err,activity){
        if(err)
        return callback(err);
        else if(activity === null)
        return callback(null,null);

        var resolvedContents = [];

        function processNextFeedItem(i) {
          // Asynchronously resolve a feed item.
          getActivityFeedItem(activity.contents[i], function(err, feedItem) {
            if (err) {
              // Pass an error to the callback.
              callback(err);
            } else {
              // Success!
              resolvedContents.push(feedItem);
              if (resolvedContents.length === activity.contents.length) {
                // I am the final feed item; all others are resolved.
                // Pass the resolved feed document back to the callback.
                activity.contents = resolvedContents;
                callback(null, activity);
              } else {
                // Process the next feed item.
                processNextFeedItem(i + 1);
              }
            }
          });
        }

        if (activity.contents.length === 0) {
          callback(null, activity);
        } else {
          processNextFeedItem(0);
        }
      });
    }
  });
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

app.put('/settings/emailChange/user/:userId',validate({body:emailChangeSchema}),function(req,res){
  var data = req.body;
  var userId = new ObjectID(req.params.userId);
  var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
  if(fromUser.str === userId.str){
    getUserData(userId,function(err,userData){
      if(err)
      return sendDatabaseError(res,err);
      else if(userData.email === data.oldEmail && validateEmail(data.newEmail)){
        db.collection('users').updateOne({_id:userId},{
          $set:{
            email: data.newEmail
          }
        },function(err){
          if(err)
          return sendDatabaseError(res,err);
          else{
            res.send(false);
          }
        });
      }
      else {
        res.send(true);
      }
    });
  }
  else{
    res.statsus(401).end();
  }
});

app.put('/settings/avatar/user/:userId',function(req,res){
  var userId = new ObjectID(req.params.userId);
  var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
  var body = req.body;
  if(fromUser.str === userId.str){
    db.collection('users').findAndModify(
      {_id:userId},
      [['_id','asc']],
      {$set:{
        avatar: body.img
      }},
      {"new":true},function(err,result){
        if(err)
        return sendDatabaseError(res,err);
        else{
          res.send(result.value);
        }
      });
    }
    else{
      res.status(401).end();
    }
  });

  app.put('/settings/location/user/:userId',function(req,res){
    var userId = new ObjectID(req.params.userId);
    var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
    var body = req.body;
    if(fromUser.str === userId.str){
      db.collection('users').updateOne({_id:userId},{
        $set:{
          location: body
        }
      },function(err){
        if(err)
        return sendDatabaseError(res,err);
        else{
          res.send(true);
        }
      });
    }
  });

  // get activity Feed data
  app.get('/user/:userid/activity', function(req, res) {
    var userId = new ObjectID(req.params.userid);
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if(userId === fromUser){
    getActivityFeedData(userId,function(err,activityData){
      if(err)
      sendDatabaseError(res,err);
      else{
        res.send(activityData);
      }
    });
    // }
    // else{
    // res.status(401).end();
    // }
  });


  function postActivity(data){
    var activityItem = {
      "type": data.type,
      "author":data.author,
      "title": data.title,
      "description":data.description,
      "img":data.img,
      "startTime": data.startTime,
      "endTime": data.endTime,
      "location": data.location,
      "participants": [],
      "likeCounter": [],
      "comments":[
      ],
      "contents": data.contents
    }
    activityItem = addDocument('activityItems',activityItem);
    var userData = readDocument('users',activityItem.author);
    var activities = readDocument('activities',userData.activity);
    activities.contents.unshift(activityItem._id);
    writeDocument('activities', activities);
    return activities;
  }
  //post activity
  app.post('/postActivity',validate({body:activitySchema}),function(req,res){
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if(fromUser === body.author){
      var activities = postActivity(body);
      res.status(201);
      res.send(activities);
    }
    else{
      res.status(401).end();
    }
  });

  //get activity detail
  app.get('/activityItem/:activityId',function(req,res){
    var activityId = new ObjectID(req.params.activityId);
    getActivityFeedItem(activityId,function(err,activityData){
      res.status(201);
      res.send(activityData);
    });
  });

  //like activity
  app.put('/activityItem/:activityId/likelist/:userId',function(req, res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var activityId = new ObjectID(req.params.activityId);
    var userId = req.params.userId;
    if (userId === fromUser) {
      var update = {
        $addToSet: {}
      };
      update.$addToSet["likeCounter"] = new ObjectID(userId);
      db.collection('activityItems').findAndModify({
        _id: activityId
      }, [
        ['_id', 'asc']
      ],
      update, {
        "new": true
      },
      function(err, result) {
        if (err) {
          return sendDatabaseError(res, err);
        } else if (result.value === null) {
          // Filter didn't match anything: Bad request.
          res.status(400).end();
        } else {
          resolveUserObjects(result.value.likeCounter,function(err,userMap){
            if(err){
              sendDatabaseError(res,err);
            }
            else{
              result.value.likeCounter = result.value.likeCounter.map((id)=>userMap[id]);
              res.send(result.value.likeCounter);
            }
          });
        }
      });
    }
    else {
      // Unauthorized.
      res.status(401).end();
    }
  });

  //unlike activity
  app.delete('/activityItem/:activityId/likelist/:userId', function(req, res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var activityId = new ObjectID(req.params.activityId);
    var userId = req.params.userId;
    if (userId === fromUser) {
      var update = {
        $pull: {}
      };
      update.$pull["likeCounter"] = new ObjectID(userId);
      db.collection('activityItems').findAndModify({
        _id: activityId
      }, [
        ['_id', 'asc']
      ],
      update, {
        "new": true
      },
      function(err, result) {
        if (err) {
          return sendDatabaseError(res, err);
        } else if (result.value === null) {
          // Filter didn't match anything: Bad request.
          res.status(400).end();
        } else {
          resolveUserObjects(result.value.likeCounter,function(err,userMap){
            if(err){
              sendDatabaseError(res,err);
            }
            else{
              result.value.likeCounter = result.value.likeCounter.map((id)=>userMap[id]);
              res.send(result.value.likeCounter);
            }
          });
        }
      });
    }
    else {
      // Unauthorized.
      res.status(401).end();
    }
  });

  //post ADcomments
  app.post('/activityItem/:activityId/commentThread/comment',validate({body:commentSchema}),
  function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var body = req.body;
    var activityItemId = new ObjectID(req.params.activityId);
    var userId = body.author;
    if(fromUser === userId){
      db.collection('activityItems').updateOne({_id: activityItemId},{
        $push:{
          comments:{
            "author":new ObjectID(userId),
            "postDate":(new Date()).getTime(),
              "text": body.text
          }}
        },function(err){
          if(err){
            sendDatabaseError(res.err);
          }
          else{
            getActivityFeedItem(activityItemId,function(err,activityData){
              if(err){
                sendDatabaseError(res,err);
              }
              else{
                res.send(activityData);
              }
            });
          }
        });
      }
      else{
        res.status(401).end();
      }
    });

  function getNotificationItem(notificationId,callback){
    db.collection('notificationItems').findOne({_id:notificationId},function(err,notification){
      if(err)
        return callback(err);
      else if(notification === null)
        return callback(null,null);
      else{
        if(notification.type === "FR"){
          getUserData(new ObjectID(notification.sender),function(err,userData){
            notification.sender = userData;
            callback(null,notification);
          });
        }
        else{
          getUserData(new ObjectID(notification.author),function(err,userData){
            notification.author = userData;
            callback(null,notification);
          });
        }
      }
    });
  }

  function getNotificationData(notificationId,callback){
    db.collection('notifications').findOne({_id:notificationId},function(err,notifications){
      if(err)
       return callback(err);

       var resolvedContents = [];

       function processNextFeedItem(i) {
         // Asynchronously resolve a feed item.
         getNotificationItem(notifications.contents[i], function(err, notification) {
           if (err) {
             // Pass an error to the callback.
             callback(err);
           } else {
             // Success!
             resolvedContents.push(notification);
             if (resolvedContents.length === notifications.contents.length) {
               // I am the final feed item; all others are resolved.
               // Pass the resolved feed document back to the callback.
               notifications.contents = resolvedContents;
               callback(null, notifications);
             } else {
               // Process the next feed item.
               processNextFeedItem(i + 1);
             }
           }
         });
       }

       if (notifications.contents.length === 0) {
         callback(null, notifications);
       } else {
         processNextFeedItem(0);
       }
    });
  }

  //get notification
  app.get('/user/:userId/notification',function(req,res){
    var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
    var userId = new ObjectID(req.params.userId);
    if(fromUser.str === userId.str){
      db.collection('users').findOne({_id:userId},function(err,userData){
        if(err)
          return sendDatabaseError(res,err);
        else if(userData === null)
          return res.status(400).end();
        else{
          getNotificationData(new ObjectID(userData.notification),function(err,notificationData){
            if(err)
              return sendDatabaseError(res,err);
            res.send(notificationData);
          });
        }
      });
    }
    else{
      res.status(401).end();
    }
  });

  function deleteNotification(notificationId, userId, callback){
    db.collection('users').findOne({_id:userId},function(err,userData){
      if(err)
        callback(err);
      else if(userData === null)
        callback(null,null);
      else{
        db.collection('notifications').updateOne({_id:userData.notification},{
          $pull:{
            contents:notificationId
          }
        },function(err){
          if(err)
            return callback(err);
          else{
              db.collection('notificationItems').remove({_id:notificationId},function(err){
                if(err)
                  return callback(err);
                else{
                  getNotificationData(userData.notification,function(err,notificationData){
                    if(err)
                      return callback(err);
                    else{
                      callback(null,notificationData);
                    }
                  });
                }
              });
          }
        });
      }
    });
  }

  //acceptRequest
  app.put('/notification/:notificationId/:userId',function(req,res){
    var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
    var userId = new ObjectID(req.params.userId);
    var notificationId = new ObjectID(req.params.notificationId);
    if(fromUser.str === userId.str){
      getNotificationItem(notificationId,function(err,notification){
        if(err)
        return sendDatabaseError(res,err);
        else{
          db.collection('users').updateOne({_id:userId},{
            $addToSet:{
              friends: notification.sender
            }
          },function(err){
            if(err)
            return sendDatabaseError(res,err);
            else{
              deleteNotification(notificationId,userId,function(err,notificationData){
                if(err)
                sendDatabaseError(res,err);
                else{
                  res.send(notificationData);
                }
              });
            }
          })
        }
      });
    }
    else{
      res.status(401).end();
    }
  });

  //deleteNotification
 app.delete('/notification/:notificationId/:userId',function(req,res){
   var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
   var userId = new ObjectID(req.params.userId);
   var notificationId = new ObjectID(req.params.notificationId);
   if(fromUser.str === userId.str){
     deleteNotification(notificationId,userId,function(err,notificationData){
       if(err)
         sendDatabaseError(res,err);
       else{
         res.send(notificationData);
       }
     });
   }
   else{
     res.status(401).end();
   }
 });

    //getMessage
    app.get('/user/:userId/chatsession/:id',function(req,res){
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var id = req.params.id;
      var userid = req.params.userId;
      if(userid == fromUser){
        db.collection('messageSession').findOne({_id:new ObjectID(id)},function(err,message){
          if(err)
            sendDatabaseError(res,err);
          else{
            //message.contents = message.contents.map(getMessage);

            getMessage(message.contents[0],function(err,data){
              if(err)
              sendDatabaseError(res,err);
              else {
                res.status(201);
                res.send(data.messages);
              }
            })
          }
        })
       }
    });

    //post message
    app.post('/user/:userid/chatsession/:id',function(req,res){
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var id = parseInt(req.params.id, 10);
      var userid = parseInt(req.params.userid, 10);
      var body = req.body;
      if(userid == fromUser){
        var senderid = body.sender;
        var targetid = body.target;
        var text = body.text;

        var message = readDocument('message',id);
        message.messages.push({
          "sender": senderid,
          "target":targetid,
          "date":(new Date()).getTime(),
          "text": text
        });
        writeDocument('message',message);

        var sessions = readDocument('messageSession',id);
        sessions.lastmessage = text;
        writeDocument('messageSession',sessions)
        res.status(201);
        res.send(getMessage(id).messages);
      }
      else{
        res.status(401).end();
      }
    });


    function getMessage(sessionId,cb){
      //var message = readDocument("message",sessionId);
      db.collection('message').findOne({_id:sessionId},function(err,messages){
        if(err){
          return cb(err);
        }
        else{

          var userList = [messages.messages[0].sender,messages.messages[0].target];
          resolveUserObjects(userList,function(err,userMap){
            if(err)
            return cb(err);
            messages.messages.forEach((message)=>{
              message.target = userMap[message.target];
              message.sender = userMap[message.sender];
            });
            cb(null,messages);
          })
        }
      });
    }

    app.get('/getsession/:userid/:targetid',function(req,res){
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userid = req.params.userid;
      if(userid == fromUser){
        var targetid = req.params.targetid;
        getSessionId(new ObjectID(userid), new ObjectID(targetid),function(err,session){
          if(err)
          sendDatabaseError(res,err);
          else {
            res.status(201);
            console.log(session);
            res.send(session);
          }
        });
      }
      else{
        res.status(401).end();
      }
    });

    function getSessionId(userid,targetid,cb){
      db.collection("messageSession").findOne(
        {
          users:{
            $all:[userid,targetid]
          }
        },function(err,session){
          if(err)
          return cb(err);
          cb(null,session);
        })
    }



    /**
    * Get the user ID from a token. Returns -1 (an invalid ID)
    * if it fails.
    */
    function getUserIdFromToken(authorizationLine) {
      try {
        // Cut off "Bearer " from the header value.
        var token = authorizationLine.slice(7);
        // Convert the base64 string to a UTF-8 string.
        var regularString = new Buffer(token, 'base64').toString('utf8');
        // Convert the UTF-8 string into a JavaScript object.
        var tokenObj = JSON.parse(regularString);
        var id = tokenObj['id'];
        // Check that id is a number.
        if (typeof id === 'string') {
          return id;
        } else {
          // Not a number. Return -1, an invalid ID.
          return "";
        }
      } catch (e) {
        // Return an invalid ID.
        return -1;
      }
    }

    var ResetDatabase = require('./resetdatabase');
    // Reset database.
    app.post('/resetdb', function(req, res) {
      console.log("Resetting database...");
      ResetDatabase(db, function() {
        res.send();
      });
    });

    /**
    * Translate JSON Schema Validation failures into error 400s.
    */
    app.use(function(err, req, res, next) {
      if (err.name === 'JsonSchemaValidation') {
        // Set a bad request http response status
        res.status(400).end();
      } else {
        // It's some other sort of error; pass it to next error middleware handler
        next(err);
      }
    });

    //get search result.
    app.get('/search/userid/:userid/querytext/:querytext',function(req,res){
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var querytext = req.params.querytext.toLowerCase();
      var userid = parseInt(req.params.userid, 10);
      if(userid == fromUser){
        var userItems= getCollection("users");
        var activityItems=getCollection("activityItems");
        var postFeedItems=getCollection("postFeedItems");
        var resultUsers = Object.keys(userItems).map((k)=>{return userItems[k]}).filter((userItem)=>{
          return userItem.firstname.toLowerCase().indexOf(querytext)!==-1 ||
          userItem.lastname.toLowerCase().indexOf(querytext)!==-1 ||
          userItem.nickname.toLowerCase().indexOf(querytext)!==-1;
        });

        var activitiesResult = Object.keys(activityItems).map((k)=>{return activityItems[k]}).filter((activityItem)=>{
          return activityItem.title.toLowerCase().indexOf(querytext)!==-1 ||
          activityItem.description.toLowerCase().indexOf(querytext)!==-1;
        });

        var postReuslt = Object.keys(postFeedItems).map((k)=>{return postFeedItems[k]}).filter((postFeedItem)=>{
          return postFeedItem.contents.text.toLowerCase().indexOf(querytext)!==-1;
        });
        var post = Object.keys(postReuslt).map((k)=>{return postReuslt[k]});



        var data={
          users: Object.keys(resultUsers).map((k)=>{return resultUsers[k]}),
          activities: Object.keys(activitiesResult).map((k)=>{return activitiesResult[k]}),
          posts: post
        };

        data.posts.map((i)=>i.contents.author=readDocument('users',i.contents.author));
        data.posts.map((i)=>(i.comments.map((j)=>j.author=readDocument('users',j.author))));
        res.send(data);
      }
      else{
        res.status(401).end();
      }
    });


    // Starts the server on port 3000!
    app.listen(3000, function () {
      console.log('app listening on port 3000!');
    });

  });
