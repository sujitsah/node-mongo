const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
   useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});


// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});


// const express = require('express');
// var exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const methodOverride = require('method-override')
// const flash = require('connect-flash');
// const session = require('express-session');
// const passport = require('passport');


// //load routes
// const ideas = require('./routes/ideas');
// const users = require('./routes/users');

// //loading passport

// require('./config/passport')(passport);

// //mongoose promise global
// mongoose.Promise = global.Promise;

// //connect to mongoose
// mongoose.connect('mongodb://localhost/vidjot-dev', {
//     useNewUrlParser: true
// })
//     .then(() => { console.log('mongodb connected') })
//     .catch(err => console.log(err));





// const app = express();
// //handle bar middleware
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(methodOverride('_method'));
// //express session middleware
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//   }));

//   app.use(flash());

//   //global variables
//   app.use(function(req,res,next){
//       res.locals.success_msg = req.flash('success_msg');
//       res.locals.error_msg = req.flash('error_msg');
//       res.locals.error = req.flash('error');
//       next();
//     });


// app.get('/', (req, res) => {
//     console.log(req.name);
//     const title = 'welcome2';
//     res.render('index', {
//         title: title
//     });
// });

// //about

// app.get('/about', (req, res) => {
//     res.render('About');
// });



// //routes
// app.use('/ideas', ideas);
// app.use('/users', users);
// const port = 5000;

// app.listen(port, () => {
//     console.log(`app listeneing to port ${port}`)
// });
