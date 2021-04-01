// const express = require('express');
// const router = express.Router();
// const User = require('../models/user.models');
// const userValidate = require('../models/user.models');

// const x = require('../models/user.models');

// // const userValidate = require('../routes/auth');

// // router.use('models/user.models', User);
// // router.use('models/user.models', userValidate);
// const app = express();
// // app.use(router);
// // app.use(User);

// // app.use(dbs);

// const mongoose = require('mongoose');
// const _ = require('lodash');
// const bcrypt = require('bcrypt');
// const { request } = require('express');
// const auth = require('../middleware/auth');
// const jwt = require('jsonwebtoken')



// // const db = require('..');
// // const UU = require('../models/user.models');




// router.post('/', async(req,res )  => {
//     console.log(User)

   
 
//     const { error } =  userValidate(req.body);
//     if (error) {
//         return res.status(404).send(error.details[0].message);

//     }
//     // let user ="hhhhhh";
//     try{
//      console.log("Ayaaaaaaaaaaaaaaaaaaaaaaaaaa");
//      console.log(req.body.email);
    
       
//     let user =  User.findOne({ email:req.body.email});
//     if (!user) {
//         console.log("User found in database");
//         return res.status(404).send('User found in database');

//     }
//     user = new User(_.pick(req.body, ['fullname', 'email', 'password']));
//     console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm"+user);
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     console.log("salt     "+salt);
//     user.password = await bcrypt.hash(user.password, salt);
//     console.log("userPassword    "+user.password)
//     console.log("User:        "+user)

//      await user.save();
     


//     //////


//     /////////
//     const token = jwt.sign({_id:this._id}, 'privateKey');
   
//     console.log(token);
//     console.log(res.header('x-auth-token', token))

//     res.header('x-auth-token', token).send(_.pick(user, ['_id', 'fullname', 'email']));
// } catch(error){return res.send('hi:  '+error)}
      
    

// });
// module.exports = router;










const express = require('express');
const path = require('path');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/signup', userController.getSignupForm)
router.post('/signup', userController.postSignup)

module.exports = router;