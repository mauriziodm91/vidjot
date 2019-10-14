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
    res.send('INDEX');
});

app.get('/about', function (req, res){
    app.send("about");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});