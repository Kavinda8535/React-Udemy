"use strict"
var express = require('express');
var app = express();
var path = require('path');

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'));

app.get('*', function(req, res) // app.get("/" , func... was there previously 
{
 res.sendFile(path.resolve(__dirname,'public','index.html'))   
});

app.listen(3000, function(){
    console.log('app is listening on port 3000');
});