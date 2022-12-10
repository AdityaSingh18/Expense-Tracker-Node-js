const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')

exports.addExpense= async(req,res,next)=>{
    console.log("req>>>>>>>"+req.user.id)
    let amount = req.body.amount;
    let descip = req.body.descip;
    let category = req.body.category;
    //const user = (jwt.verify(req.body.id, 'secretkey' ))
    //console.log(user.userId+">>>>>>>>>>>>>>>userId")

    const data = await Expense.create({
        amount:amount,
        descip:descip,
        category:category,
        userId:req.user.id
    })

    res.status(201).json({expenseDetails:data})
}

exports.getExpenses =async (req,res,next)=>{
    console.log(req.body[0])
    const data= await Expense.findAll({where:{userID:req.user.id}})
    console.log(data+"this is data")
    res.status(201).json(data)
}

exports.deleteExpense =async(req,res,next)=>{

    const userid = req.params.userID
    await Expense.destroy({where:{id:userid,userId:req.user.id}})
    .then((noofrows)=>{
        if(noofrows===0){
            return res.status(404).json({success:false,message:'Expense does not belong to the user'})
        }
    })
    res.status(200)
}