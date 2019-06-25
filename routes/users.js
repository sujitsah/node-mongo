const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//user login and register route

router.get('/login', (req, res) => {
    res.render('users/login');
});
router.get('/register', (req, res) => {
    res.render('users/register');
});
 

//load the model
require('../models/user');
const User = mongoose.model('users');

//registration for post
router.post('/register', (req, res) => {
    let errors = [];
    if (req.body.password != req.body.password2) {
        errors.push({ text: 'password do not match' });
    }
    if (req.body.password.length < 3) {
        errors.push({ text: 'length is short' });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2

        });
    }
    else {

        user.findOne({email: req.body.email})
        .then(user=>{
            
        })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password = hash;

                newUser.save()
                .then(user=>{

                    console.log('you can login');
                  res.redirect('/users/login');  
                })
                .catch(err=>{
                    console.log(err);
                    return;
                });
            });
        });
        // console.log(newUser);
        // res.send('passed');

    }
});

module.exports = router;