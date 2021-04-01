const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:44,
    },

    email: {
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:255,
    },
    password: {
        type:String,
        required:true,
        minlength:8,
        maxlength:1024,
    },cart:{
        items:[{
            productId:{
                type:mongoose.Types.ObjectId,
                ref:'product',
                required:true
            },
            qty:{
                type:Number,
                required:true
            }
        }],
        totalPrice:Number
    }
    
      
});
// var User =mongoose.model('User',userSchema);
// console.log(User);
// // module.exports = mongoose.model('User',userSchema);
// console.log("ssssssssssssssssssssssss")
// console.log(User)

// userSchema.methods
// x=userSchema.methods.generateTokens = function () {
//     //this indicate to User (which is the class for user model),privateKey is any name I want
//     const token = jwt.sign({_id:this._id}, 'privateKey');
//     return token;
    
// }
// console.log(x)



// exports.generateTokens=this.generateTokens



//  module.exports =User ;
 
 
//  const Aya = new UU({
//      fullname:111111,
//      email:"ayaha@gmail.com",
//      password:"aaaaaaaa"
//  });
//  Aya.save();

 




//  function userValidate(user){
//     const schema = {
//         fullname: joi.string().min(3).max(44).required(),
//         email: joi.string().min(3).max(255).required().email(),
//         password: joi.string().min(8).max(1024).required()
//     } 
//     return joi.validate(user,schema);

// }
// module.exports=mongoose.model('User',userSchema);

// module.exports = router;

// module.exports = userValidate;
// module.exports =User;
// module.exports= generateTokens ;
// exports.generateTokens=this.generateTokens;
































userSchema.methods.addToCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        const cart = this.cart;
        const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            cart.items[isExisting].qty += 1;
        } else {
            cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!cart.totalPrice) {
            cart.totalPrice = 0;
        }
        cart.totalPrice += product.price;
        return this.save();
    }

};


userSchema.methods.removeFromCart = function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

//'User' => users
module.exports = mongoose.model('User', userSchema);