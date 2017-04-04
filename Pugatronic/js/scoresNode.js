const user = "plumbus";
const pass = "plumbus";
const collection = "scores";
const url = "ds145750.mlab.com:45750/plumbus";

var express = require('express');
var mongo = require('mongodb').MongoClient;
var server = express();

mongo.connect('mongodb://'+url);

server.all('/name/:name', function(req, res){
});
server.all('/top/:start/:filter/:amount', function (req, res){
});
server.all('/invoegen/:naam/:tijd/:difficulty', function(req,res){
    mongo.collection(collection).insertOne()
});
server.all('/', function(req, res){

})
server.listen(3000);

function Scores(){
    this.user = "plumbus",
    this.pass = "plumbus",
    this.db = "plumbus",
    this.collection = "scores",
    this.url = "ds145750.mlab.com:45750",
    this.insertScore= function(time, score, difficulty){
        
    }
}