var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('O meu nome é Pedro Saratscheff');
});

app.listen(3000, function () {
  console.log('iic2173 nodejs/express app running on port 3000!');
});
