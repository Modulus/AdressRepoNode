var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/address';
// Use connect method to connect to the Server

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({message: "Welcome to the api, you bastard"})
});

route.get('/address/:text', function (req, res) {
  var searchText = req.params['text'];
  if(searchText){
    MongoClient.connect(url, function (err, db) {
      db.command({text: 'address', search: searchText }, function(err, cb){
        console.log(cb.results);
        res.json(cb.results);
      });
    });
  }
  else {
    res.status(500).send({error: 'Please specify a search text!'});
  }

});

module.exports = router;
