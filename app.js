const express = require('express')
const app = express()
const neatCsv = require('neat-csv');
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let user=require('./routes/user')
app.use('/', user.router)


const imageThumbnail = require('image-thumbnail');

const data=async ()=>{

imageThumbnail('resources/images/dog.jpg')
    .then(thumbnail => { console.log(thumbnail) })
    .catch(err => console.error(err));
}
data()




var port =5000;
app.listen(port, ()=>{
    console.log(`server is listening this ${port}`);
});
