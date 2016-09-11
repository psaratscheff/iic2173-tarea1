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
        ip_list = results.reverse();
      });
      db.close();
  });

  var html = '<html><body>We believe your ip is: ' + req.ip + '<br/>The Latest IPs where:'
  var i = 1;
  ip_list.forEach(function(ip_data){
    html = html + '<br/>' + i + '==>  Date: ' + ip_data['date'] + ' /// IP: ' + ip_data['ip'];
    i++;
  });
  html = html + '</body></html>'

  res.send(html);
});

app.listen(3000, function () {
  console.log('iic2173 nodejs/express app running on port 3000!');
});
