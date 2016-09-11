var express = require('express');
var app = express();

app.enable('trust proxy');

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }

    var collection = db.collection('test_insert');
    collection.insert({a:2}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });
    });

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });
});

app.get('/', function (req, res) {
  res.send('We believe your ip is: ' + req.ip);
});

app.listen(3000, function () {
  console.log('iic2173 nodejs/express app running on port 3000!');
});
