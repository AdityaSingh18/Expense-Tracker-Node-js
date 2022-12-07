const express = require('express')
const app = express();
const sequelize = require('./util/database')
const cors= require('cors')

const bodyParser = require('body-parser')
const path = require("path");
const userRoutes= require('./Routes/user')
const router = require('./Routes/user')
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname, "public")));


app.use('/user',userRoutes)


sequelize.sync()
.then(result=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err);
})
