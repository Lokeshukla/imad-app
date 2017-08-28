var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require ('pg').Pool;

var config = {
    user: 'shuklalokesh94',
    database: 'shuklalokesh94',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
    title: 'Article One | Lokesh Shukla',
    heading: 'Article One',
    date: 'August 8, 2107',
    content: ` <p>
            This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article.
            </p>
        
            <p>
            This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article. This is the content of my new article.
            </p>`
},
    'article-two': {
        title: 'Article Two | Lokesh Shukla',
        heading: 'Article Two',
        date: 'August 9, 2107',
        content: ` <p>
            This is the content of my new article. This is the content of my new article. This is the content of my new article. 
            </p>
        
            <p>
            This is the content of my new article. This is the content of my new article. This is the content of my new article. 
            </p>`
    },
    'article-three': {
         title: 'Article Three | Lokesh Shukla',
         heading: 'Article Three',
         date: 'August 10, 2107',
         content: ` <p>
            This is the content of my new article. This is the content of my new article. This is the content of my new article. 
            </p>
        
            <p>
            This is the content of my new article. This is the content of my new article. This is the content of my new article. 
            </p>`
    }
};    


function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class='container'>
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
           ${content}
        </div>
        </div>
        
    </body>
    
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  // make a select request
  // return a response with a results
  pool.query('SELECT * FROM test',function (err, result) {
      if (err) {
        res.status(500).send(err.toString());
      }else {
          res.send(JSON.stringify(result.rows));
      }
  });
});


var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});    

app.get('articles/:articleName', function (req, res) {
    // articleName == article-one
    // articles[articleName] == {} content object for article one
  pool.query("SELECT * FROM WHERE title = '" +req.parana.articleName +"'", function (err,result) {
      if (err) {
        res.status(500).send(err.toString());
      }else {
         if (result.rows.lrngth === 0) {
             res.status(404).send('Article not found');
         }else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
         }     
    }
  });
  res.send(createTemplate());
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
