const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let user=require('./routes/user')
app.use('/', user.router)

var port =5000;
app.listen(port, ()=>{
    console.log(`server is listening this ${port}`);
});
