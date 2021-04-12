const express=require('express')
const users= require('../controller/user')
const multer = require('multer');
const router=express()
var fs = require('fs');

const upload = multer({ dest: 'csvStore/' });
var type = upload.single('recfile');


router.post('/upload', type, users.csvfile)
router.get('/', users.home)
// router.post('/csv_upload', users.csv_upload)
// router.get('/download_url',  users.download_url)


module.exports={
    router
}   