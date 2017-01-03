// index.js

var express = require('express');           // simple and convenient on express.js
var mongoose = require('mongoose');         // mongo DB
var bodyParser = require('body-parser');    // Using body-parser module
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

// DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String, required:true, unique:true},
  phone:{type:String}
});
// Generate the 'Contact' object model on the name of contact which has contact Schema
// contact_model : Schema model name,
// Contact : an Object instance to be used in the whole this code.
var Contact = mongoose.model('contact_model', contactSchema);

// Routes
// Redirection to the default Route
app.get('/', function(req, res){    // be always redirected to /contacts
  res.redirect("/contacts");
});

// Show me the current indices
// items : Chunk of the DB data
// contacts_obj : a name of the argument to pass to the ejs forms.
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, items){  // Contact.find will refer to the DB
    if(err) return res.json(err);         // if error, show the error in json type
    res.render('contacts/index', {contacts_obj:items});
          // pass 'items' to the contacts/index.ejs on the name of 'contacts_obj'
  });
});
// Make the new forms
app.get('/contacts/new', function(req, res){
  res.render("contacts/new");     //watching the contacts/new.ejs
});
// POST the new form to the DB
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){  //contact is ?
    if(err) return res.json(err);
    res.redirect('/contacts');      // show the updated indices
  });
});

app.listen(3000, function(){
  console.log('Server On!');
});
