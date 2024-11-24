import userModel from "../models/user.model.js"
import AppError from "../utils/error.utils.js"


// Add products to user cart
const addToCart = async (req,res,next) => {
    try {
        const {userId, itemId, size} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.status(200).json({
            success:true,
            message:"Added to cart"
        })
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

// Add products to user cart
const updateCart = async (req, res, next) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Find the user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Ensure the cartData is an object
        let cartData = userData.cartData || {};

        // Check if the itemId exists in the cartData, if not initialize it
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Check if the size exists in the item, if not initialize it
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }

        // Update the quantity for the given size
        cartData[itemId][size] = quantity;

        // Save the updated cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Cart updated successfully'
        });

    } catch (error) {
        console.error('Error updating cart:', error);
        return next(new AppError(error.message, 500));
    }
};


// Add products to user cart
const getUserCart = async (req,res,next) => {
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