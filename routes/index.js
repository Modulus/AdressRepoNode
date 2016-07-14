var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/demo';
// Use connect method to connect to the Server

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({message: "Welcome to the api, you bastard"})
});

router.get('/address/:text', function (req, res) {
  var searchText = req.params['text'];
  if(searchText){
    console.log('Using searchText: '+searchText);
    mongoClient.connect(url, function (err, db) {
      var address = db.collection('address');
      //console.log(address.find({}));

      db.collection('address').find( {}).toArray(function(err, items){
        console.log('Items: ' + items);
        res.json(items);
      });
    });

  }
  else {
    res.status(500).send({error: 'Please specify a search text!'});
  }

});

module.exports = router;
