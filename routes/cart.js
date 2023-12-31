const router = require("express").Router()
const Cart = require("../models/Cart");
const {verifyToken,verifyTokenAndAuthorize,verifyTokenAndAdmin}= require('./verifyToken')

//Create cart

router.post('/',verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
          const savedCart= await newCart.save();
          res.status(200).json(savedCart)
    }
    catch(err){
        res.status(500).json(err)
    }
})


// update
router.put("/:id", verifyTokenAndAuthorize,async(req,res)=>{
  
    try{
           const updatedCart= await Cart.findByIdAndUpdate(req.params.id,{
             $set: req.body
           },{new:true})
           res.status(200).json(updatedCart)
    } catch(err){
        res.status(500).json(err);
    }
})


//delete
router.delete("/:id",verifyTokenAndAuthorize,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//Get user cart
router.get("/:userId",verifyTokenAndAuthorize,async(req,res)=>{
    try{
        const cart= await Cart.find({userId: req.params.userId})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

// Get all Carts
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts= await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router