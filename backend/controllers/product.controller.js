import AppError from "../utils/error.utils.js"
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/product.model.js'

// function for add product
const addProduct = async (req, res, next) => {
  try {
    const {name, description, price, category, subCategory, sizes, bestseller} = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

    let imageUrl = await Promise.all(
        images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )

    const productData = {
        name,
        description,
        category,
        subCategory,
        price: Number(price),
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imageUrl,
        date: Date.now()
    }

    const product = new productModel(productData)
    await product.save()

    res.status(200).json({
        success: true,
        message:"Product added"
    })

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
    

}

// function for list product
const listProduct = async (req, res, next) => {
    try {
        
        const products = await productModel.find({})
        res.status(200).json({
            success:true,
            products
        })
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

// function for removing product
const removeProduct = async (req, res, next) => {
   try {

    await productModel.findByIdAndDelete(req.body.id)
    res.status(200).json({
        success:true,
        message:"Product Removed"
    })
    
   } catch (error) {
    return next(new AppError(error.message, 500));
   }
}

// function for single product info
const singleProduct = async (req, res, next) => {
    try {

        const {productId} = req.body
        const product = await productModel.findById(productId)

        res.status(200).json({
            success:true,
            product
        })
    
    } catch (error) {
     return next(new AppError(error.message, 500));
    }
}

export  {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}