const user = "plumbus";
const pass = "plumbus";
const url = "ds145750.mlab.com:45750/plumbus";

var express = require('express');
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.all('/name/:name', function(req, res){
});
server.all('/top/naam/:naam', function (req, res){
    mongo.connect('mongodb://'+ url, function(err, db){
        if (!err){
            db.authenticate(user, pass);
            db.collection('scores').find(
                {'naam':req.params['naam']}
                ).toArray(function(err, scores){//Alle scores in array pushe
                    res.send(JSON.stringify(scores));//Array jsonifen en terugsturen
            })
        }
        else{
            res.setHeader('status', 500);
            res.send();
        }
    })
});
server.all('/top/diff/:row/:col/:bombs', function (req, res){
   mongo.connect('mongodb://'+ url, function(err, db){
        if (!err){
            db.authenticate(user, pass);
            var collection= db.collection('scores');
            collection.find(
                {
                    'col':req.params.col, 
                    'row':req.params.row, 
                    'bombs':req.params.bombs}
                ).toArray(function(errCol, given){
                  res.send(given);
                })
        }
        else{
            res.setHeader('status', 500);
            res.send();
        }
    })
});
server.all('/invoegen/:naam/:tijd/:row/:col/:bombs', function(req,res){
    mongo.connect('mongodb://'+url, function(err, db){
        if (!err){
            db.authenticate(user, pass);
            db.collection('scores').insertOne({
                'naam':req.params['naam'],
                'tijd':req.params['tijd'],
                'row': req.params['row'],
                'col':req.params['col'],
                'bombs':req.params['bombs']
            }, function(err2){
                if(!err2)
                    {
                        res.send(true);
                    }
                else{
                    res.send(false);
                }
            })
        }
        else{
            res.setHeader('status', 500);
            res.send();
        }
    });
});
server.all('/', function(req, res){

})
server.listen(3000);