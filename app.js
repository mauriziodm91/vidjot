const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const port = 5000;

//middleware section

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//ROUTES

app.get('/', function (req, res){
    const title = 'Welcome';
    res.render('index', {title : title
    });
});

app.get('/about', function (req, res){
    res.render('about');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});