const express = require('express')
const router = express.Router();
const expenseController= require('../controllers/expense')
const userAuthenticate = require('../middleware/auth')

router.post('/addexpense',expenseController.addExpense)

router.get('/expenses',userAuthenticate.authentication,expenseController.getExpenses)

router.delete('/delete/:userID',expenseController.deleteExpense)


module.exports=router;