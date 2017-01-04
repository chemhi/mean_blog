//routes/home.js
var express = require('express');
var router = express.Router();

// Routes
// Redirection to the default Route
router.get('/', function(req, res){    // be always redirected to /contacts
  res.redirect("/contacts");
});

module.exports = router;
