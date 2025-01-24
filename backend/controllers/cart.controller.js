import userModel from "../models/user.model.js"
import AppError from "../utils/error.utils.js"

// add products to cart
const addToCart = async(req, res, next) => {
    try {

        const {userId, itemId, size} = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.status(200).json({
            success:true,
            message: "Added to Cart"
        })
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

// update user cart
const updateCart = async(req, res, next) => {
    try {

        const {userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.status(200).json({
            success:true,
            message: "Cart Updated"
        })
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

//get user cart data
const getUserCart = async(req, res, next) => {
    try {

        const {userId} = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        res.status(200).json({
            success:true,
            cartData
        })
        
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

export {
    addToCart,
    updateCart,
    getUserCart
}