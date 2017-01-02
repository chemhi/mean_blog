var express = require('express');
var mongoose = require('mongoose');
var app = express();

// DB Setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once('open', function(){
  console.log("DB connected");
});

db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

//other settings
app.set("view engine", "ejs");  //1
app.use(express.static(__dirname + '/public'));

app.get("/hello", function(req, res){
  res.render("hello", {name:req.query.nameQuery});
});

app.get("/hello/:nameParam", function(req, res){
  res.render("hello", {name:req.params.nameParam});
});

app.listen(3000, function(){
  console.log('Server On!');
});
