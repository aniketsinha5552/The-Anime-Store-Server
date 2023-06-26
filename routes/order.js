const router = require("express").Router()
const Order = require("../models/Order");
const {verifyToken,verifyTokenAndAuthorize,verifyTokenAndAdmin}= require('./verifyToken')

//Create cart
router.post('/',verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body)
    try{
          const savedOrder= await newOrder.save();
          res.status(200).json(savedOrder)
    }
    catch(err){
        res.status(500).json(err)
    }
})


// update order
router.put("/:id", verifyTokenAndAdmin,async(req,res)=>{
  
    try{
           const updatedOrder= await Order.findByIdAndUpdate(req.params.id,{
             $set: req.body
           },{new:true})
           res.status(200).json(updatedOrder)
    } catch(err){
        res.status(500).json(err);
    }
})


//delete order
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//Get user orders
router.get("/:userId",verifyTokenAndAuthorize,async(req,res)=>{
    try{
        const orders= await Order.find({userId: req.params.userId})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

// Get all Orders of all users
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const orders= await Order.find()
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router