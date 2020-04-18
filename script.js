const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname,)));
app.use(express.static(path.join(__dirname,"pics")));
app.set('view engine', 'ejs');
app.set('views', 'views');



const cnx = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456789',
    database:'data'
});

cnx.connect(function(error){
    if(!!error) console.log(error);
    else  console.log('Connected successfuly! :)')
}); 



app.get('/', (req, res, next) => {
    const sql = "SELECT * FROM auteur";
    const query = cnx.query(sql, (err, rows) => {
        if(err)throw err;
            res.render('Auteur', {
                auteurs : rows
            });
                
    })
})

app.get('/add',(req, res) => {
    res.render('addPage');
});
   
app.post('/save',(req, res) => { 
    const data = {
        name: req.body.name, 
        description: req.body.description,
        city:req.body.city,
        biographique: req.body.biographique,
        books: req.body.books
        
    };
    const sql = "INSERT INTO auteur SET ?";
    const query = cnx.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/edit/:userId',(req, res) => {
    const auteurId = req.params.userId;
    let sql = `Select * from auteur where id = ${auteurId}`;
    let query = cnx.query(sql,(err, result) => {
        if(err) throw err;
        res.render('editPage', {
            auteur : result[0]
        });
    });
});

app.post('/update',(req, res) => {
  
    let userId = req.body.id

    let sql = "Update auteur SET name='"+req.body.name+"', description='"+req.body.description+"', city='"+req.body.city+"', biographique='"+req.body.biographique+", books='"+req.body.books+"' where id ="+userId;
    let query = cnx.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from auteur where id = ${userId}`;
    let query = cnx.query(sql,(err, result) => {
        if(err)
         throw err;
        res.redirect('/');
    });
});




app.listen(3000,()=>{
    console.log('rinning at localhost')
})