


const express = require('express');
const router = express.Router();
const User = require('../models/user.models');

const userValidate = require('../models/user.models');
const app = express();

const mongoose = require('mongoose');

const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');








router.post('/auth',async(req,res ) => {
    console.log("xxxxxxxxxxxxxxx");
    console.log(User);
    const { error } = validate(req.body)
    if(error){
        return res.status(404).send( error.details[0].message);

    }
    console.log(req.body.email);
   
     User.findOne({ email:req.body.email}).exec((err, user) => {
        if (err) {
            console.log("erorr")
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          res.status(400).send({ message: "Invalid email or password" });
          return;
        }
        const checkPassword = bcrypt.compare(req.body.password, user.password);
         if (!checkPassword) {
             return res.status(404).send('invalid email or password');

         }

         const token = jwt.sign({ _id: this._id }, "privateKey");;
         return res.send(token);
         
    
    
    });
    
   

});
function validate(req) 
{
    const schema = {
      
        email: joi.string().min(3).required().email(),
        password: joi.string().min(8).max(255).required()
    }
    return joi.validate(req,schema)
}


module.exports = router;















