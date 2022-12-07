const Sequelize = require('sequelize')
const sequelize = new Sequelize('Expense-Tracker','user','1808',{
    dialect:'mysql',
    host:'localhost'
})
module.exports= sequelize;