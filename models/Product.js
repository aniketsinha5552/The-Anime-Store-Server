const mongoose = require ("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true
        },
        desc:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: true
        },
        categories:{
            type: Array,  // array of category names
            required: true
        },     
       price:{
            type: Number,
            required: true
        },
       anime:{
            type: String,
            required: true
       },
       size:{
            type: String,
            required: false
       },
       color:{
            type: String,
            required: false
       },
       material:{
            type: String,
            required: false
       } 
    
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema);