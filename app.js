const express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    console.log(req.name);
    const title = 'welcome2';
    res.render('index',{
        title: title
    });
});

//about

app.get('/about',(req,res)=>{
    res.render('About');
});




const port = 5000;

app.listen(port,()=>{
    console.log(`app listeneing to port ${port}`)
});
