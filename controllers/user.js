const User = require('../models/user.models');
const express = require('express');
const router = express.Router();
// const User = require('../models/user.models');
const userValidate = require('../models/user.models');

const x = require('../models/user.models');
const jwt = require('jsonwebtoken');

// const userValidate = require('../routes/auth');

// router.use('models/user.models', User);
// router.use('models/user.models', userValidate);
const app = express();
// app.use(router);
// app.use(User);

// app.use(dbs);

const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { request } = require('express');

exports.getSignupForm = (req, res, next) => {
    res.render('signup', { path: '/signup', pageTitle: 'Sign up', name: 'Aya' })
}

exports.postSignup = async(req, res, next) => {
    
    // new User({
    //         email: req.body.email,
    //         password: req.body.password
    //     }).save()






    const { error } =  userValidate(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);

    }
    // let user ="hhhhhh";
    try{
     console.log("Ayaaaaaaaaaaaaaaaaaaaaaaaaaa");
     console.log(req.body.email);
    
       
    let user =  User.findOne({ email:req.body.email});
    if (!user) {
        console.log("User found in database");
        return res.status(404).send('User found in database');

    }
    user = new User(_.pick(req.body, ['fullname', 'email', 'password']));
    // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm"+user);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // console.log("salt     "+salt);
    user.password = await bcrypt.hash(user.password, salt);
    // console.log("userPassword    "+user.password)
    // console.log("User:        "+user)

     await user.save();
     


    
    const token = jwt.sign({_id:this._id}, 'privateKey');

   
    console.log(token);
    
    
     console.log(res.header);

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'fullname', 'email']));
    console.log("req.header.................................."+ req.header)
} catch(error){return res.send('hi:  '+error)}
      
    

}
// module.exports = router;
        // .then(result => {
        //     res.redirect('/');
        // }).catch(err => {
        //     throw new Error('Save User failed');
        // });
// }


    
