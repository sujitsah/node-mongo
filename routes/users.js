const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Register Form POST
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
});

//logout user

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','you are logut');
    res.redirect('/users/login');
});

module.exports = router;


// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const router = express.Router();

// //user login and register route

// router.get('/login', (req, res) => {
//     res.render('users/login');
// });
// router.get('/register', (req, res) => {
//     res.render('users/register');
// });
 
// router.post('/login',(req,res,next)=>{
//     passport.authenticate('local',{
//         successRedirect:'/ideas',
//         failureRedirect:'/users/login',
//         failureFlash: true
//     })(res,req,next);
// });

// //load the model
// require('../models/user');
// const User = mongoose.model('users');

// //registration for post
// router.post('/register', (req, res) => {
//     let errors = [];
//     if (req.body.password != req.body.password2) {
//         errors.push({ text: 'password do not match' });
//     }
//     if (req.body.password.length < 3) {
//         errors.push({ text: 'length is short' });
//     }

//     if (errors.length > 0) {
//         res.render('users/register', {
//             errors: errors,
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             password2: req.body.password2

//         });
//     }
//     else {

//         User.findOne({email: req.body.email})
//         .then(user =>{
//             if(user){
//                 req.flash('error_msg', 'email already exist');
//                 res.redirect('/users/register');
//             }
//             else{
//                 const newUser = new User({
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: req.body.password
//                 })
//                 bcrypt.genSalt(10,(err,salt)=>{
//                     bcrypt.hash(newUser.password,salt,(err,hash)=>{
//                         if(err) throw err;
//                         newUser.password = hash;
        
//                         newUser.save()
//                         .then(user=>{
        
//                           req.flash('success_msg', 'you are now registered');
//                           res.redirect('/users/login');  
//                         })
//                         .catch(err=>{
//                             console.log(err);
//                             return;
//                         });
//                     });
//                 });

//             }
//         })
      
        
//     }
// });

// module.exports = router;