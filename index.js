const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require ("dotenv")
const cors = require('cors')
dotenv.config()
app.use(cors())
app.use(express.json())

// Routes import 
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const animeRoute = require("./routes/anime")
const categoryRoute = require("./routes/category")



mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,(err)=>{
    if (err) console.log("DB connection failed")
    else console.log("DB connected")

})

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`App running on PORT ${port}`)
})

// server home page
app.get("/",(req,res)=>{ 
   const message = "Welcome to the anime store server"
   const apis= [
    {users: "api/users"},
    {auth: "api/auth"},
    {products: "api/products"},
    {carts: "api/carts"},
    {orders: "api/orders"},
   ]
    res.send([message,apis]);
})

// Routes
app.use("/api/users", userRoute)
app.use("/api", authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/animes', animeRoute)
app.use('/api/categories', categoryRoute)





