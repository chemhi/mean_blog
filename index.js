// index.js

var express = require('express');           // simple and convenient on express.js
var mongoose = require('mongoose');         // mongo DB
var bodyParser = require('body-parser');    // Using body-parser module
var methodOverride = require('method-override'); //
var app = express();                        // Makeing use of the express object

// DB Setting ...
// bring the mongoose env value from the host PC and Open its DB
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;               // The mongoose Connection constructor
// => var db =mongoose.createConnection(process.env.MONGO_DB);

// DB openning
db.once('open', function(){                 // open the mongo DB
  console.log("DB connected");              // openning log
});

// emitting the error function for the DB
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

//Specifying the ejs module as a view engine
app.set("view engine", "ejs");  //1
app.use(express.static(__dirname + '/public')); // default directory
app.use(bodyParser.json());                     // can be only useable with the json type
app.use(bodyParser.urlencoded({extended:true}));  // encoding the url as the readable type
app.use(methodOverride("_method"));

//make the modules for redirection
app.use("/", require("./routes/home"));
app.use("/contacts", require("./routes/contacts"));

app.listen(3000, function(){
  console.log('Server On!');
});
