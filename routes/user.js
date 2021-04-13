const express=require('express')
const users= require('../controller/user')
const multer = require('multer');
const router=express()

const upload = multer({ dest: 'csvStore/' });
var type = upload.single('recfile');

router.get('/', users.home)
router.post('/upload', type, users.csvfile)
router.get('/download_url',  users.download_url)

module.exports={
    router
}   