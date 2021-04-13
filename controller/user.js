const path= require('path')
const Image_url=require('../model/image_stored')
const nodemailer=require('nodemailer')
const fs = require('fs');
var dsv = require('d3-dsv');
var fsPromises = require('fs').promises
var download = require('download');
// const csv = require('csv-parser');
// const multer = require('multer');
// var parse = require('csv-parse');


//form open here.
const home=(req,res)=>{
    console.log("api is working here..........")
    return res.sendFile(path.join(__dirname, '../' + 'view/index.html'))
}

const mailerer=(req)=>{
     //nodemailer
     let mailTransporter = nodemailer.createTransport({   
        service: 'gmail',
        auth: {
            user: 'aijaj18@navgurukul.org',
            pass: process.env.Password
        }
    });
      
    let mailDetails = {
        from: 'aijaj18@navgurukul.org',
        to: req.body.email,
        subject: 'Welcome to mail check',
        text: 'user that the task is successful.'
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err.message)
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}


//image uploading here.
const csvfile=  (req,res)=>{
    var tmp_path = req.file.path;
    var target_path = 'csvStore/' + req.file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.on('end', function() { res.render('complete'); });
    src.on('error', function(err) { res.render('error'); });
    
    mailerer(req)
    console.log("csv file upload success...")
    res.send({message: "Images are being uploaded...", file: req.file})
}


//save file downlod file
const download_url=(req,res)=>{
    async function all(){
        let data = dsv.csvParse(await fsPromises.readFile("./images.csv",  { encoding: "utf8" }))
        console.log(data)
        const all_data= await Image_url.find()
        if(all_data){
            console.log(all_data)
            return res.send({message: "data allready exits", status: "success"})
        }
        await Image_url.insertMany(data) //image store in db
        .then(()=>{
            console.log("Data inserted")  // Success
        })
        .catch(function(error){
            console.log(error)      // Failure
        });
        data.forEach(element => {
            download(element.Image_URL, "uploads",  {filename:  element.ID + ".jpg"})
        });

        mailerer(req)
        res.send("task is successfully!")
    }
    all()
}


module.exports={    
    home,
    csvfile,
    download_url
}