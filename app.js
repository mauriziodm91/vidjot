const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
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

//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

//Process Form

app.post('/ideas', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }

  if (!req.body.details) {
    errors.push({ text: 'Please add some details' });
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      res.redirect('/ideas');
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
