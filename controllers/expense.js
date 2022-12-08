const Expense = require('../models/expense')


exports.addExpense= async(req,res,next)=>{
    console.log(req.body)
    let amount = req.body.amount;
    let descip = req.body.descip;
    let category = req.body.category;
    console.log(amount,descip,category)

    const data = await Expense.create({
        amount:amount,
        descip:descip,
        category:category
    })

    res.status(201).json({expenseDetails:data})
}

exports.getExpenses =async (req,res,next)=>{
    
    const data= await Expense.findAll()
    console.log(data+"this is data")
    res.status(201).json(data)
}

exports.deleteExpense =async(req,res,next)=>{

    const userid = req.params.userID
    await Expense.destroy({where:{id:userid}})
    res.status(200)
}