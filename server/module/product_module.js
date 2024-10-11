import mongoose from "mongoose";

const ProductSchema= new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    category:{
        type:String
    }
})


export default mongoose.model('product',ProductSchema);