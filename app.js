const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');

const port = 5000;

//Map Global Promise - get rid of warning

mongoose.Promise = global.Promise;

//connect to mongoose

mongoose
  .connect('mongodb://localhost/vidjot-dev', {
    useMongoClient: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//load idea model

require('./models/Idea');
const Idea = mongoose.model('ideas');

//middleware section

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

//ROUTES

app.get('/', function(req, res) {
  const title = 'Welcome';
  res.render('index', { title: title });
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/ideas/add', function(req, res) {
  res.render('ideas/add');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
