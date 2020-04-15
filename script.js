
var express = require('express');
var path = require('path');
var app = express();


app.use(express.static(path.join(__dirname, '/public/')));
app.set('views','./views');
app.set('view engine', 'ejs');

app.get('/',function(req,Response){

Response.render('index.ejs');

});

app.listen(2200,function(){

 console.log('listen port ');
});