const user = "plumbus";
const pass = "plumbus";
const url = "ds145750.mlab.com:45750/plumbus";

var express = require('express');
var mongo = require('mongodb').MongoClient;
var server = express();

server.all('/top/naam/:naam', function (req, res){ //Roep alle scores bij naam op
    mongo.connect('mongodb://'+ url, function(err, db){
        if (!err){
            db.authenticate(user, pass);
            db.collection('scores').find(
                {'naam':req.params['naam']}
                ).toArray(function(errFind, scores){//Alle scores in array pushe
                    if (!errFind)
                        {
                            res.send(JSON.stringify(scores));//Array jsonifen en terugsturen
                        }
                    else{
                        res.setHeader('status', 500);
                        res.send();
                    }
            })
        }
        else{
            res.setHeader('status', 500);
            res.send();
        }
    })
});

server.all('/configs/', function(req, res){ //Roep alle configuraties en bijhorende scorelijsten op
    mongo.connect('mongodb://'+ url, function(err, db){
        if (!err){
            db.authenticate(user, pass);
            db.collection('scores').group(
                ['col', 'row', 'bombs'],
                {},
                {"scores":[]},
                "function(cur, result){result.scores.push({naam:cur.naam, tijd:cur.tijd})}",
                function(errAggs, docs){
                    if (!errAggs)
                        {
                            res.send(docs);
                        }
                    else{
                        res.send(errAggs);
                    }
                })
        }else{
            res.setHeader('status', 500);
            res.send();
        }
})})

server.all('/top/diff/:row/:col/:bombs', function (req, res){ //Roep de lijst per configuratie op
   mongo.connect('mongodb://'+ url, function(err, db){
        if (!err){
            db.authenticate(user, pass);
            var collec = db.collection('scores');
            collec.find({
                "col":parseInt(req.params.col), 
                "row":parseInt(req.params.row), 
                "bombs":parseInt(req.params.bombs)}).toArray(function (errCol, given)
                {
                  if (!errCol)
                    {
                        res.send(given);
                    }
                    else{
                        res.send(errCol);
                    }
                })
        }
        else{
            res.setHeader('status', 500);
            res.send();
        }
    })
});
server.all('/invoegen/:naam/:tijd/:row/:col/:bombs', function(req,res){ //Nieuwe score toevoegen
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