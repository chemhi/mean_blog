var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); //1

app.listen(3000, function(){
  console.log('Server On!');
});
