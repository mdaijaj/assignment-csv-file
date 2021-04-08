const uniqueValidator = require('mongoose-unique-validator')
const mongoose=require('../database/db')
const Schema= mongoose.Schema;

let user_data= new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    }
},{timestamps: true}); 

user_data.plugin(uniqueValidator)
const User_Data= mongoose.model('User_Data', user_data)
module.exports=User_Data;