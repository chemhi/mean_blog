// models/Contact.js

var mongoose = require("mongoose");         // mongo DB

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

module.exports = Contact;
