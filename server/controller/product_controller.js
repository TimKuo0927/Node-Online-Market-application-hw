import Product from '../module/product_module.js'
import Category from '../module/categories_module.js'

const getallproduct = async (req,res)=>{
    const nameInput = req.query.name;
    let products="";
    if(!nameInput){
         products = await Product.find().select("name description price quantity  category");
    }else{
         products = await Product.findOne({name: {$regex : nameInput}});
    }

  
    res.json(products)
}
const createproduct = async (req,res)=>{
    const category = await Category.findOne({name:req.body.category});
    // console.log(req.body.category);
    console.log(category);
    if(!category){
        return res.status(400).json({
            message:"create product failed! can not fit category"
        })
    }
    const product = new Product(req.body);
    await product.save();
    return res.status(200).json({
        message:"create product success"
    })
}
const findproductbyid = async (req,res,next,id)=>{
    let product = await Product.findById(id);
    if(!product){
        res.status(400).json({
            message:"error! can not find product"
        })
    }
    req.profile = product; 
    next();
}


const updateproductbyid = async (req,res)=>{
    const product = await Product.findByIdAndUpdate(req.profile._id, req.body,{ new: true });
    req.profile = product;
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    res.json({
        message:"update success",
        UPDATE_Product: req.profile
    })
}

const deleteproductbyid = async (req,res)=>{
    const product = await Product.deleteOne( { _id: req.profile._id})
  
    res.json({
        message:"delete success",
      
    })
}

const deleteallproduct = async (req,res)=>{
    const product = await Product.deleteMany({})
  
    res.json({
        message:"delete all success",
      
    })
}
  



export default {getallproduct,createproduct,findproductbyid,updateproductbyid,deleteproductbyid,deleteallproduct}