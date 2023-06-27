const router = require("express").Router()
const User = require("../models/User")
const CryptoJs = require("crypto-js")
const jwt = require ("jsonwebtoken")

//Register
router.post("/register", async (req,res)=>{
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
         ). toString() ,

    })
  try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch(err){
    res.status(500).json(err)
  }
})

//Login
router.post("/login", async(req,res)=>{

    const { username, password } = req.body;
    
    User.findOne({username:username},(err,user)=>{
        if(user){
            const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC)
            const pass = hashPassword.toString(CryptoJs.enc.Utf8)
            if(pass!==password){
                res.status(500).send({message:"Invalid login details"})
            }
            else{
                const accessToken= jwt.sign({
                    id: user._id, 
                    isAdmin: user.isAdmin
                }
                ,process.env.JWT_SEC,
                {expiresIn:"3d"}
                )
                res.status(200).send({message:"Sucessfully Logged In!",user, accessToken})

            }
        }
        else{
            res.status(500).send({message:"Invalid Credentials!"})
        }
    })

    // const {username, password}= req.body
    // try{
    //     const user = await User.findOne({
    //         username: req.body.username
    //     },(err,user))
    //     !user && res.json("Wrong Credentials")
    //     const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC)
    //     const pass = hashPassword.toString(CryptoJs.enc.Utf8)

    //     pass !== req.body.password && res.json("Wrong Credentials")
    //      const {password, ...others}= user._doc;
    //     res.json(others)
    // }catch(err){
    //     res.status(500).json(err) 
    // }
    
})

module.exports = router