// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
// Support receiving JSON in HTTP request bodies


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
  var deleteDocument = database.deleteDocument;
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

  //get user data
  app.get('/user/:userId',function(req,res){
    var userId = req.params.userId;
    db.collection('users').findOne({_id:new ObjectID(userId)},function(err,userData){
      if(err)
      sendDatabaseError(res,err);
      else{
        resolveUserObjects(userData.friends,function(err,userMap){
          if(err)
          sendDatabaseError(res,err);
          else{
            userData.friends = userData.friends.map((id)=>userMap[id]);
            resolveSessionObject(userData.sessions,function(err,sessionMap){
              if(err)
              sendDatabaseError(res,err);
              else{
                userData.sessions = userData.sessions.map((id)=>sessionMap[id]);
                res.send(userData);
              }
            });
          }
        });
      }
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
            "author": userId,
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
    var userId = parseInt(req.params.userId);
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    if(fromUser == userId){
      var userData = readDocument('users',userId);
      userData.lastname = data.lastname;
      userData.firstname = data.firstname;
      userData.nickname = data.nickname;
      userData.description = data.description;
      userData.location = data.location;
      userData.birthday = moment(data.birthday).valueOf();

      writeDocument('users', userData);
      res.status(201);
      res.send(userData);
    }
    else{
      res.status(401).end();
    }
  });

  function getActivityFeedData(user){
    var userData = readDocument('users',user);
    var activityData = readDocument('activities', userData.activity);
    activityData.contents = activityData.contents.map(getActivityFeedItemSync);
    return activityData;
  }

  app.put('/settings/emailChange/user/:userId',validate({body:emailChangeSchema}),function(req,res){
    var data = req.body;
    var userId = parseInt(req.params.userId);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if(fromUser === userId){
      var userData = readDocument('users',userId);
      if(userData.email === data.oldEmail){
        userData.email = data.newEmail;
        writeDocument('users', userData);
        res.send(false);
      }
      else{
        res.send(true);
      }
    }
    else{
      res.statsus(401).end();
    }
  });

  app.put('/settings/location/user/:userId',function(req,res){
    var userId = parseInt(req.params.userId);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var body = req.body;
    if(fromUser === userId){
      var userData = readDocument('users',userId);
      userData.location = body;
      writeDocument('users', userData);
      res.status(201);
      res.send(true);
    }
  });

  // get activity Feed data
  app.get('/user/:userid/activity', function(req, res) {
    var userId = parseInt(req.params.userid,10);
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if(userId === fromUser){
    res.send(getActivityFeedData(userId));
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
    var activityId = parseInt(req.params.activityId);
    var activityData = getActivityFeedItemSync(activityId);
    res.status(201);
    res.send(activityData);
  });


  function getActivityFeedItemSync(activityId){
    var activityItem = readDocument('activityItems', activityId);
    activityItem.author = readDocument('users', activityItem.author);
    activityItem.participants = activityItem.participants.map((id) => readDocument('users', id));
    activityItem.likeCounter = activityItem.likeCounter.map((id) => readDocument('users', id));
    activityItem.comments.forEach((comment) => {
      comment.author = readDocument('users', comment.author);
    });

    return activityItem;
  }

  //like activity
  app.put('/activityItem/:activityId/likelist/:userId',function(req, res){
    var activityId = parseInt(req.params.activityId, 10);
    var userId = parseInt(req.params.userId, 10);
    var activityItem = readDocument('activityItems', activityId);
    if(activityItem.likeCounter.indexOf(userId) === -1){
      activityItem.likeCounter.push(userId);
      writeDocument('activityItems', activityItem);
    }
    res.status(201);
    res.send(activityItem.likeCounter.map((id) => readDocument('users', id)));
  });

  //unlike activity
  app.delete('/activityItem/:activityId/likelist/:userId', function(req, res){
    var activityId = parseInt(req.params.activityId, 10);
    var userId = parseInt(req.params.userId, 10);
    var activityItem = readDocument('activityItems', activityId);
    var index = activityItem.likeCounter.indexOf(userId);
    if(index !== -1){
      activityItem.likeCounter.splice(index, 1);
      writeDocument('activityItems', activityItem);
    }
    res.status(201);
    res.send(activityItem.likeCounter.map((id) => readDocument('users', id)));

  });

  //post ADcomments
  app.post('/activityItem/:activityId/commentThread/comment',validate({body:commentSchema}),
  function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var body = req.body;
    var activityItemId = parseInt(req.params.activityId, 10);
    var userId = body.author;
    if(fromUser === userId){
      var activityFeedItem = readDocument('activityItems',activityItemId);
      activityFeedItem.comments.push({
        "author": userId,
        "text": body.text,
        "postDate": (new Date()).getTime()
      });
      writeDocument('activityItems',activityFeedItem);
      res.status(201);
      res.send(getActivityFeedItemSync(activityItemId));
    }
    else{
      res.status(401).end();
    }
  });


  function getNotificationDataSync(notificationId){
    var notification = readDocument('notificationItems',notificationId);
    if(notification.type === "FR"){
      notification.sender = readDocument("users",notification.sender);
    }
    else{
      notification.author = readDocument("users",notification.author);
    }

    return notification;
  }

  //get notification
  app.get('/user/:userId/notification',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = parseInt(req.params.userId);
    if(fromUser === userId){
      var userData = readDocument('users',userId);
      var notificationData = readDocument('notifications',userData.notification);
      notificationData.contents = notificationData.contents.map(getNotificationDataSync);
      res.status(201);
      res.send(notificationData);
    }
    else{
      res.status(401).end();
    }
  });


  function deleteNotification(id, user){
    var userData = readDocument('users',user);
    var notificationData = readDocument('notifications',userData.notification);
    var index = notificationData.contents.indexOf(id);
    if(index !== -1)
    notificationData.contents.splice(index,1);

    writeDocument("notifications",notificationData);
    deleteDocument("notificationItems",id);
    return notificationData;
  }

  //acceptRequest
  app.put('/notification/:notificationId/:userId',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = parseInt(req.params.userId);
    var notificationId = parseInt(req.params.notificationId);
    if(fromUser === userId){
      var userData = readDocument('users',userId);
      var notificationItem = readDocument('notificationItems',notificationId);
      userData.friends.push(notificationItem.sender);
      writeDocument("users",userData);
      res.status(201);
      res.send(deleteNotification(notificationId,userId));
    }
    else{
      res.status(401).end();
    }
  });

  //deleteNotification
  app.delete('/notification/:notificationId/:userId',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = parseInt(req.params.userId);
    var notificationId = parseInt(req.params.notificationId);
    if(fromUser === userId){
      res.status(201);
      res.send(deleteNotification(notificationId,userId));
    }
    else{
      res.status(401).end();
    }
  });

  //getMessage
  app.get('/user/:userId/chatsession/:id',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var id = parseInt(req.params.id, 10);
    var userid = parseInt(req.params.userId, 10);
    if(userid == fromUser){
      var message = readDocument('messageSession',id);
      message.contents = message.contents.map(getMessageSync);
      res.status(201);
      res.send(getMessageSync(id).messages);
    }
    else{
      console.log(fromUser);
      res.status(401).end();
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
      res.send(getMessageSync(id).messages);
    }
    else{
      res.status(401).end();
    }
  });


  function getMessageSync(sessionId){
    var message = readDocument("message",sessionId);
    message.messages.forEach((message)=>{
      message.sender = readDocument('users', message.sender);
      message.target = readDocument('users', message.target);
    });
    return message;
  }

  app.get('/getsession/:userid/:targetid',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userid = parseInt(req.params.userid, 10);
    if(userid == fromUser){
      var targetid = parseInt(req.params.targetid, 10);
      res.status(201);
      res.send(getSessionId(userid,targetid));
    }
    else{
      console.log(fromUser);
      res.status(401).end();
    }
  });

  function getSessionId(userid,targetid){
    var sessions = getCollection('messageSession');
    var arr = Object.keys(sessions).map(function(k) { return sessions[k] });
    var sessionId = arr.filter(function(sessionObject){
      var users = sessionObject.users;
      if(users.indexOf(userid)!==-1 && users.indexOf(targetid)!==-1){
        return sessionObject._id;
      }
    });
    return sessionId[0];
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
