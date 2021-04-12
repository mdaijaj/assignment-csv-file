const path= require('path')
const User_Data=require('../model/user')
const nodemailer=require('nodemailer')
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
var parse = require('csv-parse');
var dsv = require('d3-dsv');
var fsPromises = require('fs').promises
var download = require('download');


//form open here.
const home=(req,res)=>{
    console.log("api is working here..........")
    return res.sendFile(path.join(__dirname, '../' + 'view/index.html'))
}


//image uploading here.
const csvfile=  (req,res)=>{
    var tmp_path = req.file.path;
    var target_path = 'csvStore/' + req.file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.on('end', function() { res.render('complete'); });
    src.on('error', function(err) { res.render('error'); });
    console.log(`new upload = ${req.file.filename}\n`);
    

    // nodemailer
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
        text: 'Node.js testing mail for GeeksforGeeks'
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err.message)
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
    console.log("csv file upload success...")
    res.send({message: "csv file upload success...", file: req.file})
}



//save file downlod file
const download_url=(req,res)=>{
    async function all(){
        let data = dsv.csvParse(await fsPromises.readFile("./csvStore/images.csv",  { encoding: "utf8" }))
    
        data.forEach(element => {
            console.log(element)
            download(element.Image_URL, "uploads",  {filename:  element.ID + ".jpg"})
        });
    }
    all()
}




// let request = require('request');
// async function    download(url, dest) {
//     const file = fs.createWriteStream(dest);
//     await new Promise((resolve, reject) => {
//       request({uri: url, gzip: true,}).pipe(file).on('finish', async () => {
//         console.log(`The file is finished downloading.`);
//         resolve();
//     })
//     .on('error', (error) => {
//         reject(error);
//     });
// })
//     .catch((error) => {
//         console.log(`Something happened: ${error}`);
//     });
// }


// (async (records)=>{
//     console.log("aijajkhan", records)
//     records.forEach(element => {
//         download(element.Image_URL, 'images', {filename:  element.ID + ".jpg"});
//     });
//     console.log('done')
// })(records); 




// // csv file read
// const csvreadfile=()=>{
//     var parser = parse({columns: true}, function (err, records) {
//         // console.log(records);

//     });
//     fs.createReadStream('./uploads/images.csv').pipe(parser);
// }

// // csvreadfile()

module.exports={    
    home,
    csvfile,
    download_url
}