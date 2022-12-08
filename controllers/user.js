const User = require('../models/users')
const Expense = require('../models/expense')
const bcrypt = require('bcrypt')

exports.signup=async(req,res)=>{
    console.log(req.body)
try{
    const {name,email,password} = req.body;
    console.log(name)
    if(name==undefined||name.length===0||password==undefined||password.length===0||email==undefined||email.length===0){
        return res.status(400).json({err:'bad parameter'})
    }
    
   bcrypt.hash(password,10,async (err,hash)=>{
    const user = User.findAll({where:{email}})
    if(user.length>0){
        return res.status(409).json({message:'user already exist'})
    }
    await User.create({name,email,password:hash}).then(()=>{
        res.status(201).json({message:'successfully created new user'})
    })
   })
    
    
}
catch (err) {
    res.status(500).json(err);
}
}

exports.signin= async(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;
    if(password==undefined||password.length===0||email==undefined||email.length===0){
        return res.status(400).json({err:'bad parameter'})
    }
    const userMail= await User.findAll({where:{email}})
bcrypt.compare(password,userMail[0].password,(err,data)=>{
if(err){
    return res.status(500).json({message:'something went wrong'})
}
if(data===true){
    return res.status(201).json({message:'login success'})
    

}
else{
    return res.status(400).json({message:'Password is Incorrect'})
}
})

}
