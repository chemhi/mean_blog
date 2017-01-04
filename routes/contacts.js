//routes/home.js
var express = require('express');
var router = express.Router();
var Contact = require("../models/Contact");

// Show me the current indices
// items : Chunk of the DB data
// contacts_obj : a name of the argument to pass to the ejs forms.
router.get('/', function(req, res){
  Contact.find({}, function(err, items){  // Contact.find will refer to the DB
    if(err) return res.json(err);         // if error, show the error in json type
    res.render('contacts/index', {contacts_obj:items});
    console.log(items);
          // pass 'items' to the contacts/index.ejs on the name of 'contacts_obj'
  });
});
// Make the new forms
router.get('/new', function(req, res){
  res.render("contacts/new");     //watching the contacts/new.ejs
});
// POST the new form to the DB
router.post('/', function(req, res){
  Contact.create(req.body, function(err, contact){  //contact is ?
    if(err) return res.json(err);
    res.redirect('/contacts');      // show the updated indices
  });
});

// Show me the List contents
router.get('/:id', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, item){
    if(err) return res.json(err);
    res.render("contacts/show", {contact_obj:item});
    console.log(item);
  });
});
//Edit user's information
router.get('/:id/edit',function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, item){
    if(err) return res.json(err);
    res.render("contacts/edit", {contact_obj:item});
      console.log(item);
  });
});
//Update user's information
router.put('/:id',function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, item){
    if(err) return res.json(err);
    res.redirect("/contacts/"+req.params.id);
  });
});
//Destroy the targeted user
router.delete('/:id', function(req, res){
  Contact.remove({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

module.exports = router;
