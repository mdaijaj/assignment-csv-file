const mongoose=require('../database/db')
const Schema= mongoose.Schema;

let image_url= new Schema({
   ID: {
        type: String,
        unique: true
    },
    Image_URL: {
        type: String,
    }
},{timestamps: true}); 

const Image_url= mongoose.model('Image_url', image_url)
module.exports=Image_url;