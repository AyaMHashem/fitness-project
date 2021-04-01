var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;



const express =require('express');
const joi = require('@hapi/joi');
const app = express();
app.use(express.json());
const users = require('./routes/users');

const userauth = require('./routes/auth');
const shop = require('./routes/shop');
const admin =require('./routes/admin');

const mongoose =require('mongoose');



mongoose.connect('mongodb://localhost/FitnessApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log('Connected to Database ...')).catch((error)=> console.error('Error:'+ error));


 app.use( users);
app.use(userauth);
app.use(shop);

app.use(admin);


app.listen(3000, ()=>
 console.log('working 3000'));

