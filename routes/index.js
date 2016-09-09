var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

function getConnectionString(){
    switch(process.env.ENV){
        case 'local':
            return 'mongodb://localhost:27017/demo';
        case 'dev':
        case 'development':
            return 'mongodb://db:27017/demo';
        default:
            return 'mongodb://db:27017/demo';

    }
}


/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({message: "Welcome to the api, you bastard"})
});


router.get('/search', function(req, res){
  var searchText = req.query.text
  console.log(searchText);
  if(searchText){
    console.log('Using searchText: '+searchText);
    mongoClient.connect(url, function (err, db) {
      var address = db.collection('address');
      //console.log(address.find({}));
      db.collection('address').find({$text: {$search: searchText, $caseSensitive: false}}).toArray(function (err, items) {
        console.log('Items: ' + items);
        res.json(items);
      });
    });

  res.json(req.query.text)
});

router.post('/search', function (req, res) {
  var url = getConnectionString();
  console.log("Using connectionString: "+url);
  console.log(req.body.text);
  var searchText = req.body.text;
  if(searchText){
    console.log('Using searchText: '+searchText);
    mongoClient.connect(url, function (err, db) {
      var address = db.collection('address');
      //console.log(address.find({}));
      db.collection('address').find({$text: {$search: searchText, $caseSensitive: false}}).toArray(function (err, items) {
        console.log('Items: ' + items);
        res.json(items);
      });



    });

  }
  else {
    res.status(500).send({error: 'Please specify a search text!'});
  }

});

router.get('/all', function(req, res){
  var url = getConnectionString();
  mongoClient.connect(url, function (err, db) {
    db.collection('address').find({}).toArray(function (err, items) {
      console.log('Items: ' + items);
      res.json(items);
    });
  });
});

module.exports = router;
