const User = require('../models/users')

exports.signup=async(req,res)=>{
    console.log(req.body)
try{
    const {name,email,password} = req.body;
    console.log(name)
    if(name==undefined||name.length===0||password==undefined||password.length===0||email==undefined||email.length===0){
        return res.status(400).json({err:'bad parameter'})
    }

    const user = User.findAll({where:{email}})
    if(user.length>0){
        return res.status(409).json({message:'user already exist'})
    }
    await User.create({name,email,password}).then(()=>{
        res.status(201).json({message:'successfully created new user'})
    })
    
}
catch (err) {
    res.status(500).json(err);
}
}
