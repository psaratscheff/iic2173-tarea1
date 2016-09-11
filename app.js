var express = require('express');
var app = express();

app.enable('trust proxy');

app.get('/', function (req, res) {
  res.send('We believe your ip is: ' + req.ip);
});

app.listen(3000, function () {
  console.log('iic2173 nodejs/express app running on port 3000!');
});
