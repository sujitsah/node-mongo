const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//user login and register route

router.get('/login',(req,res)=>{
    res.render('users/login');
});
router.get('/register',(req,res)=>{
    res.render('users/register');
});


module.exports = router;