const express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// app.use(function(req,res,next){
//     // console.log('time',Date.now());
//     req.name='Sujit';

//     next();
// });


//index
app.get('/',(req,res)=>{
    console.log(req.name);
    res.send('index');
});

//about

app.get('/about',(req,res)=>{
    res.send('About');
});




const port = 5000;

app.listen(port,()=>{
    console.log(`app listeneing to port ${port}`)
});
