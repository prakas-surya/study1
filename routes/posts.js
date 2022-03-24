const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const Post = require('../models/post');

const { registerValidation, loginValidation } = require('./validation');

//submits a post
router.post('/', async (req,res) => {

    //validate before saving a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //checking if the user is already exists
    const emailExist = await Post.findOne({email : req.body.email});
    if (emailExist) return res.status(400).send('email already exists...!');

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const post = new Post({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedPost = await post.save();
        res.json({post: post._id});
    }  catch (err) {
        res.status(400).send(err);
    }

});

//login 

router.post('/login', async (req,res)  => {

    //validate before saving a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the mail exists
    const post = await Post.findOne({email : req.body.email});
    if (!post) return res.status(400).send('email is not found..!');

    //password is correct ...
    const validPass = await bcrypt.compare(req.body.password, post.password);
    if(!validPass) return res.status(400).send('invalid password.....!');


    //create and assign a token
    const token = jsonwebtoken.sign({_id: post._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    

    
}); 

module.exports = router;
