const path= require('path')
const User_Data=require('../model/user')
const nodemailer=require('nodemailer')
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');

const csv_upload=(req,res)=>{
    const image=req.file
    const email=req.body.email
   console.log(image)
    const obj=new User_Data({image, email})
    console.log(obj)
    obj.save()
    .then((data)=>{
        console.log(data)
        res.send("data insert successfully!")
    })
    .catch((err)=>{
        console.log(err.message)
    })
}


//form open here.
const home=(req,res)=>{
    console.log("api is working here..........")
    return res.sendFile(path.join(__dirname, '../' + 'view/index.html'))
}


//image uploading here.
const arr=[]
const csvfile=  (req,res)=>{
     
    // console.log(`new upload = ${req.file.filename}\n`);
    // console.log(req.file);
    console.log("csv file upload success...")


    const upload = multer({ dest: 'upload_url/' });
//    fs.createReadStream(req.file.path)
//    .pipe(csv())
//    .on('data', (row) => {
//     console.log(row)
//     // console.log(row.Image_URL);
// //     arr.push(row)
// //    upload.single(row.Image_URL)
// })
// .on('end', () => {
//     console.log('CSV file successfully processed');
// });




//upload csv file
//csv file upload
fs.readFile('./uploads/images.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(await neatCsv(data))
  })


   
    

//     //use nodemailer
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         secure: false,
//         port: 25,
//         auth: {
//             user: "aijaj18@navgurukul.org",
//             pass: "aijaj@#123"
//             // pass: process.env.pass
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });
//     var mailOptions = {
//         from: "aijaj18@navgurukul.org",
//         to: "aijaj535@gmail.com",
//         subject: "Welcome to Medium blog website to confirm your mail",
//         text: "Hello message have you reach your destination "
//     };
//     if (transporter.sendMail(mailOptions)) {
//         console.log("mail got successfully")
//         // res.send("mail got successfully!")
//         // res.sendFile(path.join(__dirname, '../' + '/views/otp.html'))
//     }
//     else {
//         res.send("Couldn't send OTP.")
//     }


    // file uploading succkess
}


const download_url= async(req,res)=>{
    //MAKE A FUNCTION AND CALL A FUNCTION
    const upload = multer({ dest: 'upload_url/' });
   await fs.createReadStream(req.file.path).pipe(csv()).on('data', (row) => {
    // console.log(row)
    upload.single(row.Image_URL), (err,data)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log("data", data)
        }
    }
    // console.log(row.Image_URL);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
}






module.exports={
    csv_upload,
    home,
    csvfile,
    download_url
}
