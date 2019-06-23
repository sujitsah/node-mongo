const express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

//mongoose promise global
mongoose.Promise = global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{
    useNewUrlParser: true
})
.then(()=>{console.log('mongodb connected')})
.catch(err => console.log(err));

//load the mongoose
require('./models/idea');
const Idea = mongoose.model('ideas');



const app = express();
//handle bar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

//load ideas
app.get('/ideas/add',(req,res)=>{
    res.render('ideas/add');
});

//process form
app.post('/ideas',(req,res)=>{
    let errors = [];

    if(!req.body.title){
        errors.push({text: 'please add title'});
    }
    if(!req.body.details){
        errors.push({text: 'please add details'});
    }
    if(errors.length > 0){
        res.render('ideas/add',{
            errors:errors,
            title: req.body.title,
            details: req.body.details
        });
    }
    else
    {
    const newUser={
            title:req.body.title,
            details:req.body.details
    }
    new Idea(newUser)
        .save()
        .then(idea=>{
            res.redirect('/ideas');

        })
    
    }
});
//idea index page
app.get('/ideas',(req,res)=>{
    idea.find({})  
    .sort({date:'desc'})
    .then(ideas=>{
        res.render('ideas/index',{
            ideas:ideas
        });
        
    });
    
});

const port = 5000;

app.listen(port, () => {
    console.log(`app listeneing to port ${port}`)
});
