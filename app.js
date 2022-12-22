const express = require('express')
const app = express();
const sequelize = require('./util/database')
const cors= require('cors')

const bodyParser = require('body-parser')
const path = require("path");
const userRoutes= require('./Routes/user')
const expenseRouter = require('./Routes/expense')
const router = require('./Routes/user')
const User = require('./models/users')
const Expense = require('./models/expense');
const Order = require('./models/order');
const purchaseRouter = require('./Routes/purchase')
const premiumFeatureRouter = require('./Routes/premiumFeature')
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({extended:false}))
app.use(express.static(path.join(__dirname, "public")));


app.use('/user',userRoutes)
app.use(expenseRouter)
app.use('/payment' , purchaseRouter)
app.use('/premium',premiumFeatureRouter)

Expense.belongsTo(User);
User.hasMany(Expense)

User.hasMany(Order)
Order.belongsTo(User)



sequelize.sync()
.then(result=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err);
})
