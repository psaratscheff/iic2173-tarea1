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
        ip_list = results;
      });
      db.close();
  });

  res.send('We believe your ip is: ' + req.ip + '\n and the lastest ips were:\n' + '1: ' + ip_list[0]['ip'] + '\n2: ' + ip_list[1]['ip'] + '\n3: ' + ip_list[2]['ip']);
});

app.listen(3000, function () {
  console.log('iic2173 nodejs/express app running on port 3000!');
});
