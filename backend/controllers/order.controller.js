import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"
import AppError from "../utils/error.utils.js"

// Placing orders using COD
const placeOrder = async (req, res, next) => {

    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.status(200).json({
            success:true,
            message:"Order Placed"
        })
    } catch (error) {
        return next(new AppError(error.message, 500)); 
    }

}

// Placing orders using Stripe
const placeOrderStripe = async (req, res, next) => {

}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res, next) => {

}

// All orders data for Admin panel
const allOrders = async (req, res, next) => {
  try {
    
    const orders = await orderModel.find({})

    res.status(200).json({
        success:true,
        orders
    })
  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

// User order data for frontend
const userOrders = async (req, res, next) => {
  try {
    
    const {userId} = req.body

    const orders = await orderModel.find({userId})

    res.status(200).json({
        success:true,
        orders
    })

  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

// Update order status from Admin Panel
const updateStatus = async (req, res, next) => {
  try {

    const {orderId, status} = req.body

    await orderModel.findByIdAndUpdate(orderId, {status})

    res.status(200).json({
      success:true,
      message:'Status Updated'
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500)); 
  }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}