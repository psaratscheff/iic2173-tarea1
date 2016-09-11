var express = require('express');
var app = express();

app.enable('trust proxy');

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var ip_list;
app.get('/', function (req, res) {
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
      if (err) {
          throw err;
      }

      var collection = db.collection('ip_list');
      var d = new Date();
      collection.insert({ ip: req.ip, date: d })
      collection.find().toArray(function(err, results) {
        console.dir(results);
      });
      ip_list = collection.find();
      db.close();
  });

  res.send('We believe your ip is: ' + req.ip + '\n and the last ip was: ' + ip_list);
});

app.listen(3000, function () {
  console.log('iic2173 nodejs/express app running on port 3000!');
});
