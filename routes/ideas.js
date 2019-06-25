const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//load the mongoose
require('../models/idea');
const Idea = mongoose.model('ideas');

//load ideas
router.get('/add',(req,res)=>{
    res.render('ideas/add');
});

//edit ideas

router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id :req.params.id

    })
    .then(idea =>{
        res.render('ideas/edit',{
            idea:idea
        });
    });
});

//process form
router.post('/',(req,res)=>{
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
        .then(idea =>{
            res.redirect('/ideas');

        })
    
    }
});
//idea index page
router.get('/',(req,res)=>{
    Idea.find({})  
    .sort({date:'desc'})
    .then(ideas=>{
        res.render('ideas/index',{
            ideas:ideas
        });
        
    });
    
});

//update form

router.put('/:id',(req , res) => {
    Idea.findOne({
        _id :req.params.id})
        //new values
        .then(idea=>{
            idea.title= req.body.title,
            idea.details=req.body.details
        
            idea.save()
            .then(idea=>{
                res.redirect('/ideas');
            })
        });
        
});

//delete the ideas

router.delete('/:id',(req,res)=>{
    Idea.remove({
        _id: req.params.id
    })
    .then(()=>{
        res.redirect('/ideas');

    });
});


module.exports = router;
