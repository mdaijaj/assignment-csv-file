
const express=require('express')
const users= require('../controller/user')
const multer = require('multer');

const router=express()

const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('statement'), users.csvfile)
router.get('/', users.home)
router.post('/csv_upload', users.csv_upload)
router.get('/download_url',  users.download_url)



module.exports={
    router
}