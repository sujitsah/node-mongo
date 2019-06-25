const express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
//mongoose promise global
mongoose.Promise = global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true
})
    .then(() => { console.log('mongodb connected') })
    .catch(err => console.log(err));





const app = express();
//handle bar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    console.log(req.name);
    const title = 'welcome2';
    res.render('index', {
        title: title
    });
});

//about

app.get('/about', (req, res) => {
    res.render('About');
});



//routes
app.use('/ideas', ideas);
app.use('/users', users);
const port = 5000;

app.listen(port, () => {
    console.log(`app listeneing to port ${port}`)
});
